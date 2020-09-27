import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
"https://placehold.it/198x264&text=Image+Not+Found";


const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.large_cover_image;
  return (
    <div className="movie">
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.title}`}
          src={poster}
        />
      </div>
    </div>
  );
};


export default Movie;