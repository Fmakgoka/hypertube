import React, {useState } from 'react';
import axios from 'axios';
import './homepage.css';
import Movie from './movie';
import InfiniteScroll from 'react-infinite-scroller'
import AuthService from "../../services/auth.service";


const Searching = () => {
  const currentUser = AuthService.getCurrentUser();
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }


  const searching = page => {
    axios.get(`http://localhost:9000/search/?q=${searchValue}&page=${page}`, {
      headers: {
        'content-Type': 'application/json',
        'x-access-token': `${currentUser.accessToken}`
      }
    })
      .then(res => {
        let results = JSON.parse(res.data.data)
        const newList = movies.concat(results['data'].movies);
        if (results.status === "ok") {
          if (results['data'].movie_count !== 0) {
            setMovies(newList)
            if ((results['data'].movie_count / results['data'].limit) === page) {
              setHasMoreItems(false);
            } else {
              setHasMoreItems(true);
            }
          } else {
            setHasMoreItems(false);
            setErrorMessage('movies not found');
          }
        }
      }).catch(e => {
        setErrorMessage('movies not found');
        console.log(e);
        console.log(errorMessage);
        setHasMoreItems(false);
      })
  }

  return (
    <div className="Home">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={searching} type="submit" value="SEARCH" />
  
      <InfiniteScroll
        initialLoad={false}
        className="movies"
        threshold={250}
        pageStart={1}
        loadMore={searching}
        hasMore={hasMoreItems}
        loader={<div key={0} className="text-center">loading data...</div>}
      >
        <div className="movies">
          {errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
              movies.map((movie, index) => (
                <Movie key={`${index}-${movie.title}`} movie={movie} />
              ))
            )}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Searching