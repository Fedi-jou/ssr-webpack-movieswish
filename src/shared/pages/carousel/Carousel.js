import * as React from "react";
import AliceCarousel from "react-alice-carousel";
import SingleContent from "../../components/singleContent/SingleContent";
import CustomPagination from "../../utils/CustomPagination";
import "./carousel.scss";

// import { useParams } from "react-router-dom";

export default function Carousel({ fetchInitialData, data }) {
  const [repos, setRepos] = React.useState(() => {
    return __isBrowser__ ? window.__INITIAL_DATA__ : data;
  });

  // const [loading, setLoading] = React.useState(repos ? false : true);

  const [page, setPage] = React.useState(1);

  // routes = { ...routes[0], page: 3 };

  // const fetchNewRepos = React.useRef(repos ? false : true);

  // const { id } = useParams();

  React.useEffect(() => {
    // if (fetchNewRepos.current === true) {
    // setLoading(true);
    fetchInitialData().then((repos) => {
      setRepos(repos);
      repos && console.log(repos, "test state");

      // setLoading(false);
    });
    // } else {
    //   fetchNewRepos.current = true;
    // }
  }, [page]);

  // if (loading === true) {
  //   return <i className="loading">🤹‍♂️</i>;
  // }

  const items =
    repos &&
    repos.map((c) => (
      <div className="carouselItem">
        <SingleContent
          key={c.id}
          id={c.id}
          poster={c.poster_path || c.profile_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type={c.media_type}
          vote_average={c.vote_average}
        />
      </div>
    ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };
  return (
    // <div>
    //   {repos &&
    //     repos.map((item, index) => {
    //       return <h1 key={item.id}>{item.title} || {item.name}</h1>;
    //     })}
    // </div>
    <>
      <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
      <CustomPagination setPage={setPage} />
      <hr className="rounded" />
    </>
  );
}
