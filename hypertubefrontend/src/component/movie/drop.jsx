import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import axios from 'axios';
import Movie from "./movie";


const Dropdown = () => {
	const currentUser = AuthService.getCurrentUser();
	const [items, setItems] = useState(["title", "download_count", "year"]);
	const [movies, setMovies] = useState([])
	const [errorMessage, setErrorMessage] = useState(null);
  
	let sort;
	const Add = items.map(Add => Add
	)

	const handleAddrTypeChange = (e) => {
		console.log((items[e.target.value]))
		sort = items[e.target.value]

	}
	const submit = (page) => {
		console.log('submit', sort)
		axios.get(`http://localhost:9000/homepage?items=${sort}`, {
			headers: {
				'content-Type': 'application/json',
				'x-access-token': `${currentUser.accessToken}`
			}
		}).then(res => {
			let results = JSON.parse(res.data.data)
			console.log(`Useeffect results`);
			setMovies(results['data'].movies)
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
			<input onClick={submit} type="submit" value="sort" />
			<div className="Home">
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
		</div>

	);
}



export default Dropdown