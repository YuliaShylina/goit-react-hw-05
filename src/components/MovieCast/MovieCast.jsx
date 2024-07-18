import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../movies-api";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <p className={css.errorTxt}>Something went wrong...</p>}
      {cast && cast.length > 0 ? (
        <ul className={css.list}>
          {cast.map((actor) => (
            <li key={actor.cast_id} className={css.item}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className={css.img}
                />
              )}
              <p className={css.actorName}>{actor.name}</p>
              <p className={css.list}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className={css.noCast}>Sorry, we have got no cast</p>
      )}
    </div>
  );
}
