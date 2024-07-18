import axios from "axios";

const API_KEY = "21e1fd853d578d54551f55a71a8c9fc4";
const BASE_URL = "https://api.themoviedb.org/3";
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWUxZmQ4NTNkNTc4ZDU0NTUxZjU1YTcxYThjOWZjNCIsIm5iZiI6MTcyMDk1NTYxNy42MDc5NjYsInN1YiI6IjY2OTM5MTI4NGJhZDE2MGVkNWIyYWNkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CeT_bc4q-_7Dkz5HNoNRgpX4_UTyQ6KbWRTb_8BNQn0";

export const getMovies = async () => {
  const response = await axios.get("/trending/movie/day?language=en-US", {
    params: {
      api_key: API_KEY,
    },
  });
  console.log(response);
  return response.data.results;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`);
  console.log(response);
  return response.data;
};

export const getMovieCast = async (castId) => {
  const response = await axios.get(`/movie/${castId}/credits?language=en-US`);
  console.log(response);
  return response.data;
};
export const getMovieReviews = async (reviewId) => {
  const response = await axios.get(`/movie/${reviewId}/reviews?language=en-US`);
  console.log(response);
  return response.data.results;
};

export const getMovieByQuery = async (query) => {
  const response = await axios.get("/search/movie", {
    params: {
      query: query,
    },
  });
  console.log(response);
  return response.data.results;
};
