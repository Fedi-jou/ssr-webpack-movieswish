import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import "./moviecontrol.scss";

export const MovieControl = ({ movie }) => {
  const { addMovieToWatchlist, removeMovieFromWatchlist } =
    useContext(GlobalContext);

  return (
    <div className="inner-card-controls">
      <button
        className="ctrl-btn"
        onClick={() => removeMovieFromWatchlist(movie.id)}
      >
        <RemoveCircleOutlineIcon />
      </button>
    </div>
  );
};
