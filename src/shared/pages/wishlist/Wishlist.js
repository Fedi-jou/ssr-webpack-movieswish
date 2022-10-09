import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { MovieCard } from "../../components/movieCard/MovieCard";
import "./wishlist.scss";

function Wishlist() {
  const watchlist = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="header">
        <h1>My Wishlist</h1>

        <span className="count-pill">
          {watchlist.watchlist.length}
          {watchlist.watchlist.length === 1 ? " Movie" : " Movies"}
        </span>
      </div>

      {watchlist.watchlist.length > 0 ? (
        <div className="movie-grid">
          {watchlist.watchlist.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <h2 className="no-movies">No movies in your list! Add some!</h2>
      )}
    </div>
  );
}

export default Wishlist;
