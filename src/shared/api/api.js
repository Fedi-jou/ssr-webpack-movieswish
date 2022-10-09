import fetch from "isomorphic-fetch";

export function fetchPopularRepos(media = "tv") {
  const encodedURI = encodeURI(
    `https://api.themoviedb.org/3/trending/${media}/day?api_key=${process.env.REACT_APP_API_KEY}&page=1`
  );

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos.results)
    .catch((error) => {
      console.warn(error);
      return null;
    });
}
