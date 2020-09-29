import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
"https://placehold.it/198x264&text=Image+Not+Found";


const Movie = (props) => {
  const poster =
    props.movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : props.movie.large_cover_image;
  return (
    <div className="movie">
      <div>
        <img
          // key={props.key}
          width="150"
          alt={`The movie titled: ${props.movie.title}`}
          src={poster}
        />
      </div>
    </div>
  );
};


export default Movie;