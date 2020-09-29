import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './homepage.css';
import AuthService from "../../services/auth.service";
import Movie from './movie';
import Search from './search';



const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    
    axios.get(`http://localhost:9000/homepage`, {
      headers: {
        'content-Type': 'application/json',
        'x-access-token': `${currentUser.accessToken}`
      }
    })
      .then(res => {
        let results = JSON.parse(res.data.data)
        console.log(results);
        setMovies(results['data'].movies)
        setLoading(false)
      })
      .catch(error => console.log(error))

  }, [])

  const search = searchValue => {
    setLoading(true);
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
          console.log("STATUS")
          if (movies['data'].movie_count !== 0) {
            setMovies(movies['data'].movies)
            setLoading(false)

          } else {
            console.log("(action.error")
            setLoading(true);
            setErrorMessage('movies not found');

          }

        } else {
          setLoading(true);
          setErrorMessage('movies not fount');
        }
      })
  }

  console.log('two', movies);
  return (
    <div className="Home">
      {/* <Search search={search} /> */}
      <div className="movies">
        {loading &&
          <span>loading...</span>
        }
        {errorMessage &&
          <span>{errorMessage}</span>
        }
        {movies &&
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        }

      </div>
    </div>
  )
}

export default Home;