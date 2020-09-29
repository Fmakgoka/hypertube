import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './homepage.css';
import AuthService from "../../services/auth.service";
import Movie from './movie';
import Search from './search';

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {  
    axios.get(`http://localhost:9000/homepage`, {
      headers: {
        'content-Type': 'application/json',
        'x-access-token': `${currentUser.accessToken}`
      }
    })
      .then(res => {
        setLoading(false)
        let results = JSON.parse(res.data.data)
        console.log(`Useeffect results`);
        setMovies(results['data'].movies)
      })
      .catch(error => console.log(error))

  }, [])

  const search = searchValue => {
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

  console.log('two', movies);
  return (
    <div className="Home">
      <Search search={search} />
      <div className="movies">
      {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
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

export default Home;