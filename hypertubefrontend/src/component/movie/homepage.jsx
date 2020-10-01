import React, {useState} from 'react';
import axios from 'axios';
import './homepage.css';
import AuthService from "../../services/auth.service";
import Movie from './movie';
import InfiniteScroll from 'react-infinite-scroller'

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const [movies, setMovies] = useState([])
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
      let results = JSON.parse(res.data.data)
      const newList = movies.concat(results['data'].movies);
      setMovies(newList);
      console.log(`resDATA`, results['data'])
      if ((results['data'].movie_count / results['data'].limit) === page) {
        setHasMoreItems(false);
      } else {
        setHasMoreItems(true);
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <div>
      < select
        onChange={e => handleAddrTypeChange(e)}
        className="browser-default custom-select" >
        {
          Add.map((address, key) => <option key={key} value={key}>{address}</option>)
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
              movies.map((movie, index) => (
                <Movie key={`${index}-${movie.title}`} movie={movie} />
              ))
            )}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Home;
