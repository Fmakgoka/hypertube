import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './homepage.css';
import Search from './search';
import Movie from './movie';
import InfiniteScroll from 'react-infinite-scroller'
import AuthService from "../../services/auth.service";


const Searching = () => {
  const currentUser = AuthService.getCurrentUser();
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);

  const searching = searchValue => {
    // setLoading(true);
    setErrorMessage(null);
    axios.get(`http://localhost:9000/search/?q=${searchValue}`, {
      headers: {
        'content-Type': 'application/json',
        'x-access-token': `${currentUser.accessToken}`
      }
    })
      .then(res => {
        let movies = JSON.parse(res.data.data)
        if (movies.status === "ok") {
          if (movies['data'].movie_count !== 0) {
            console.log("RETURNING MOVIES")
            setLoading(false)
            setMovies(movies['data'].movies)
          } else {
            console.log("(action.error")
            setLoading(false);
            setErrorMessage('movies not found');
            setMovies([])
          }
        } else {
          setLoading(false);
          setErrorMessage('Something went wrong');
          setMovies([])
        }
      })
  }

  return (
    <div className="Home">
      <Search search={searching} />
				<div className="movies">
					{errorMessage ? (
						<div className="errorMessage">{errorMessage}</div>
					) : (
								movies.map((movie, index) => (
									<Movie key={`${index}-${movie.title}`} movie={movie} />
								))
							)}
				</div>
			</div>
  )
}

export default Searching