import React from 'react'
import './homepage.css';


function Popup({ selected, closePopup }) {
	console.log('selected', selected)
	return (
		<section className="popup">
			<div className="content">
				<h2>{selected.title} <span>({selected.year})</span></h2>
				<p className="rating">Rating: {selected.rating}</p>
				<div className="plot">
					<img
						alt={`The movie titled: ${selected.title}`}
						src={selected.large_cover_image} />
					<p>Description: {selected.description_full}</p>
					<p>Likes: {selected.like_count}</p>

				</div>
				<button className="close" onClick={closePopup}>Close</button>
			</div>
		</section>
	)
}

export default Popup