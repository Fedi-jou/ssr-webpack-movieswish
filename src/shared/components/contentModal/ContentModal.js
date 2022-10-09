import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { img_500, unavailable } from "../../assets/config";
import YouTubeIcon from "@material-ui/icons/YouTube";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import "./contentmodal.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: " #3EECAC",
    backgroundImage: "linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%)",
    width: "90%",
    height: "80%",
    // backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, media_type, id }) {
  const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    if (media_type !== "person") {
      fetchVideo();
    }

    // eslint-disable-next-line
  }, []);

  const storedMovie = watchlist.find((o) => o.id === id);
  const watchlistDisabled = storedMovie ? true : false;

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div
                className={`" ContentModal " ${
                  media_type === "movie"
                    ? "font1"
                    : media_type === "tv"
                    ? "font2"
                    : "font3"
                }`}
              >
                <img
                  src={
                    content.poster_path || content.profile_path
                      ? `${img_500}/${
                          content.poster_path || content.profile_path
                        }`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModalPortrait"
                />
                <div className="ContentModalAbout">
                  <span className="ContentModalTitle">
                    {content.name || content.title}
                    {media_type !== "person"
                      ? ` (${(
                          content.first_air_date ||
                          content.release_date ||
                          ""
                        ).substring(0, 4)})`
                      : ""}
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  {media_type !== "person" ? (
                    <span className="ContentModal__description">
                      {content.overview}
                    </span>
                  ) : null}

                  <button
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(content)}
                    className={`btn0 ${
                      media_type === "movie"
                        ? "btn1"
                        : media_type === "tv"
                        ? "btn2"
                        : "btn3"
                    }`}
                  >
                    {media_type !== "person" ? (
                      <>WishList</>
                    ) : (
                      <>Like the actor </>
                    )}
                    <BookmarksIcon />
                  </button>

                  {media_type !== "person" ? (
                    <button
                      target="__blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                      className={`btn0 ${
                        media_type === "movie"
                          ? "btn1"
                          : media_type === "tv"
                          ? "btn2"
                          : "btn3"
                      }`}
                    >
                      <>Watch Trailer</>
                      <YouTubeIcon
                        color="secondary"
                        variant="contained"
                        className="material-icons md"
                      />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
