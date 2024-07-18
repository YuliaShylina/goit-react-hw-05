import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import css from "./MovieDetails.module.css";

export default function MovieDetails({ movie }) {
  const releaseYear = movie.release_date.substring(0, 4);
  const popularity = movie.vote_average.toFixed(1);
  const genres = movie.genres.map((genre) => (
    <span key={genre.id}>{genre.name}</span>
  ));
  const src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  return (
    <div className={css.container}>
      <Link to={backLink.current} state={location}>
        <button className={css.btn}>
          <FaArrowLeftLong className={css.btnArror} />
          Go back
        </button>
      </Link>

      <div className={css.containerImgTxt}>
        <img src={src} alt={movie.name} className={css.img} />
        <div className={css.infoTxt}>
          <h2>{`${movie.title} (${releaseYear})`}</h2>
          <p>Rating: {popularity}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p className={css.genres}>{genres}</p>
        </div>
      </div>
    </div>
  );
}
