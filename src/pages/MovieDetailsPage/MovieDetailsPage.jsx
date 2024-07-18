import { getMovieById } from "../../movies-api";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Suspense } from "react";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        toast.error("Please, try to reload this page!");
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <p className={css.errorTxt}>
          Something went wrong. Please try again later.
        </p>
      )}
      {movie && <MovieDetails movie={movie} />}
      <Toaster />
      {movie && (
        <div className={css.addInfoContainer}>
          <h3 className={css.addInfoTxt}>Additional information</h3>
          <ul className={css.detailList}>
            <li className={css.linkDetail}>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li className={css.linkDetail}>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
        </div>
      )}
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
