import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './homepage.css';
import AuthService from "../../services/auth.service";
import Movie from './movie';
import InfiniteScroll from 'react-infinite-scroller'
import Dropdown from './drop';

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  
  const loadUserList = (page) => {
    console.log(page)
    axios.get(`http://localhost:9000/homepage?page=${page}`, {
      headers: {
        'content-Type': 'application/json',
        'x-access-token': `${currentUser.accessToken}`
      }
    })
      .then((res) => {
        let results = JSON.parse(res.data.data)
        const newList = movies.concat(results['data'].movies);
        setMovies(newList);
        console.log(`resDATA`, results['data'])
        if((results['data'].movie_count/results['data'].limit) === page) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  
  return (
    <div className="Home">
      <Dropdown />
      <div className="movies">
      <InfiniteScroll
          className="movies"
          threshold={250}
          pageStart={0}
          loadMore={loadUserList}
          hasMore={hasMoreItems}
          loader={<div key={0} className="text-center">loading data ...</div>}>
           {errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
        </InfiniteScroll>
        {hasMoreItems ? "" : <div className="text-center">no data anymore ...</div> }
      </div>
    </div>
  )
}

export default Home;