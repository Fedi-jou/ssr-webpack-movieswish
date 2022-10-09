import { fetchPopularRepos } from "./api/api";
import Carousel from "./pages/carousel/Carousel.js";

const routes = [
  {
    path: "/",
    component: Carousel,
    fetchInitialData: (param2) => fetchPopularRepos(param2),
  },
];

export default routes;
