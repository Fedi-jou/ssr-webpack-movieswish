import { fetchPopularRepos } from "./api/api";
import Carousel from "./pages/carousel/Carousel.js";

const routes = [
  {
    path: "/movie",
    component: Carousel,
    fetchInitialData: (path = "") => fetchPopularRepos(path.split("/").pop()),
  },
  {
    path: "/tv",
    component: Carousel,
    fetchInitialData: (path = "") => fetchPopularRepos(path.split("/").pop()),
  },

  {
    path: "/person",
    component: Carousel,
    fetchInitialData: (path = "") => fetchPopularRepos(path.split("/").pop()),
  },
];

export default routes;
