import React from "react";
import { MovieControl } from "../../utils/moviecontrol/MovieControl";
import { unavailable, img_200 } from "../../assets/config";
import "./moviecard.scss";

export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="overlay"></div>
      <img
        src={
          movie.poster_path || movie.profile_path
            ? `${img_200}/${movie.poster_path || movie.profile_path}`
            : unavailable
        }
        alt={`${movie.title} Poster`}
      />

      <MovieControl movie={movie} />
    </div>
  );
};
