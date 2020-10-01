import React from 'react'
import Movie from './movie'


function Movies ({ movies, openPopup }) {
	return (
		<section className="movies">
			{movies.map(ovie => (
				<Movie key={movie.id} movie={movie} openPopup={openPopup} />
			))}
		</section>
	)
}

export default Movies