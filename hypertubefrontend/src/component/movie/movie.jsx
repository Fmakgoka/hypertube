import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://placehold.it/198x264&text=Image+Not+Found";


const Movie = ({movie,openPopup}) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.large_cover_image;
  return (
    <div className="movie" onClick={() => openPopup(movie.id)}>
        <img
          // key={props.key}
          width="150"
          alt={`The movie titled: ${movie.title}`}
          src={poster}
        />
        {/* <video src='https://www.youtube.com/watch?v=Z8he5Fh65n4'>the</video> */}

         <p>({movie.year})</p> 
      <h4>{movie.title}</h4>
      <h4>{movie.imdb_code}</h4>

      </div>
  );
};


export default Movie;