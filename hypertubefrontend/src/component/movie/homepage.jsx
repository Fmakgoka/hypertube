
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import'./homepage.css'
import AuthService from "../../services/auth.service";
import Movie from './movie';
import Search from './search'

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state)
  useEffect(() => {
    axios.get('http://localhost:9000/homepage', {
      headers: {
        'content-Type': 'application/json',
        'x-access-token': `${currentUser.accessToken}`
      }
    })
      .then(res => {
        let movies = JSON.parse(res.data.data)
        // console.log( movies['data'].movies)
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: movies['data'].movies
        })
      })
      .then(jsonResponse => {

      })
    // .catch(error => console.log(error))
  }, []);

  const { movies, errorMessage, loading } = state;
  console.log(movies)
  return (
    <div className="Home">
      <Search/>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default Home;