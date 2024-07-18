import css from "./HomePages.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getMovies } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        toast.error("Please, try to reload this page!");
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Trending today</h2>
      {loading && <Loader />}
      {error && (
        <p className={css.errorTxt}>
          Something went wrong. Please try again later.
        </p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
      <Toaster position="top-right" />
    </div>
  );
}
