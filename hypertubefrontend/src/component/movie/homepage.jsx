import React, { useState } from 'react';
import axios from 'axios';
import './homepage.css';
import AuthService from "../../services/auth.service";
import Movie from './movie';
import InfiniteScroll from 'react-infinite-scroller'
import Popup from './popup';

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const [movies, setMovies] = useState({
    results: [],
    selected: {}
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [items] = useState(["title", "download_count", "year"]);
  const [srt, setMethod] = useState(null)
  let sort;
  const Add = items.map(Add => Add)

  const handleAddrTypeChange = (e) => {
    console.log((items[e.target.value]))
    sort = items[e.target.value]
    setMethod(sort)
  }

  const submit = (page) => {
    console.log('submit', page)
    axios.get(`http://localhost:9000/homepage?items=${srt}&page=${page}`, {
      headers: {
        'content-Type': 'application/json',
        'x-access-token': `${currentUser.accessToken}`
      }
    }).then(res => {
      let result = JSON.parse(res.data.data)
      const newList = movies.results.concat(result['data'].movies);
      setMovies(prevState => {
        return {...prevState, results:newList}
      }
        );
      console.log(`resDATA`, result['data'])
      if ((result['data'].movie_count / result['data'].limit) === page) {
        setHasMoreItems(false);
      } else {
        setHasMoreItems(true);
      }
    })
      .catch(error => console.log(error))
  }

  const openPopup = (id) => {
    axios.get(`http://localhost:9000/movieDetails?id=${id}`, {
      headers: {
        'content-Type': 'application/json',
        'x-access-token': `${currentUser.accessToken}`
      }
    }).then(res => {
      let detail =  JSON.parse(res.data.data)

      let {data} = detail
      setMovies(prevState => {
        return { ...prevState, selected: data.movie }
      });

    }).catch(error => console.log(error))
  }
  
  const closePopup = () => {
    setMovies(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  return (
    <div>
      < select
        onChange={e => handleAddrTypeChange(e)}
        className="browser-default custom-select" >
        {
          Add.map((address, key) => <option key={key} value={key} >{address}</option>)
        }
      </select >
      <input onClick={submit} type="submit" value={sort} />
      {/* <div className="Home"> */}
      <InfiniteScroll
        initialLoad={false}
        className="movies"
        threshold={250}
        pageStart={1}
        loadMore={submit}
        hasMore={hasMoreItems}
        loader={<div key={0} className="text-center">loading data ...</div>}
      >
        <div className="movies">
          {errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
              movies.results.map((movie) => (
                <Movie key={movie.id} movie={movie} openPopup={openPopup} />

              ))
              
            )}
            {(typeof movies.selected.title != "undefined") ? <Popup selected={movies.selected} closePopup={closePopup} /> : false}

        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Home;
