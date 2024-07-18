// import { useState, useEffect } from "react";
// import { useSearchParams, useLocation } from "react-router-dom";
// import Loader from "../../components/Loader/Loader";
// import MovieList from "../../components/MovieList/MovieList";
// import { getMovieByQuery } from "../../movies-api";
// import toast, { Toaster } from "react-hot-toast";
// import css from "./MoviesPage.module.css";

// export default function MoviesPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const initialNameFilmFilter = searchParams.get("name") ?? "";
//   const [nameFilmFilter, setNameFilmFilter] = useState(initialNameFilmFilter);
//   const [filteredMovies, setFilteredMovies] = useState(
//     initialNameFilmFilter ? [] : null
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === "/movies") {
//       setFilteredMovies(null);
//       setNameFilmFilter(""); // Очищення поля при переході на сторінку пошуку
//     }
//   }, [location.pathname]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!nameFilmFilter.trim()) {
//       toast.error("The search field is required.");
//       return;
//     }

//     setSearchParams({ name: nameFilmFilter });

//     try {
//       setLoading(true);
//       setError(false);
//       const data = await getMovieByQuery(nameFilmFilter);
//       setFilteredMovies(data);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }

//     setNameFilmFilter(""); // Очищення поля пошуку після натискання кнопки
//   };

//   return (
//     <div className={css.container}>
//       <form onSubmit={handleSubmit} className={css.form}>
//         <input
//           type="text"
//           value={nameFilmFilter}
//           onChange={(e) => setNameFilmFilter(e.target.value)}
//           placeholder="Search for movies"
//           required
//         />
//         <button type="submit" className={css.btn}>
//           Search
//         </button>
//       </form>
//       {loading && <Loader />}
//       {error && (
//         <p className={css.errorTxt}>
//           Something went wrong. Please try again later.
//         </p>
//       )}
//       {!loading && !error && filteredMovies !== null && (
//         <div className={css.resultsContainer}>
//           {filteredMovies.length > 0 ? (
//             <MovieList movies={filteredMovies} />
//           ) : (
//             <p className={css.notFound}>No movies found</p>
//           )}
//         </div>
//       )}
//       <Toaster />
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { useSearchParams, useLocation } from "react-router-dom";
// import Loader from "../../components/Loader/Loader";
// import MovieList from "../../components/MovieList/MovieList";
// import { getMovieByQuery } from "../../movies-api";
// import toast, { Toaster } from "react-hot-toast";
// import css from "./MoviesPage.module.css";

// export default function MoviesPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const initialNameFilmFilter = searchParams.get("name") ?? "";
//   const [nameFilmFilter, setNameFilmFilter] = useState(initialNameFilmFilter);
//   const [filteredMovies, setFilteredMovies] = useState(
//     initialNameFilmFilter ? [] : null
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === "/movies") {
//       setNameFilmFilter(""); // Очищення поля при переході на сторінку пошуку
//     }
//   }, [location.pathname]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (!nameFilmFilter.trim()) return;

//       try {
//         setLoading(true);
//         setError(false);
//         const data = await getMovieByQuery(nameFilmFilter);
//         setFilteredMovies(data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [nameFilmFilter]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!nameFilmFilter.trim()) {
//       toast.error("The search field is required.");
//       return;
//     }

//     setSearchParams({ name: nameFilmFilter });
//   };

//   return (
//     <div className={css.container}>
//       <form onSubmit={handleSubmit} className={css.form}>
//         <input
//           type="text"
//           value={nameFilmFilter}
//           onChange={(e) => setNameFilmFilter(e.target.value)}
//           placeholder="Search for movies"
//           required
//         />
//         <button type="submit" className={css.btn}>
//           Search
//         </button>
//       </form>
//       {loading && <Loader />}
//       {error && (
//         <p className={css.errorTxt}>
//           Something went wrong. Please try again later.
//         </p>
//       )}
//       {!loading && !error && filteredMovies !== null && (
//         <div className={css.resultsContainer}>
//           {filteredMovies.length > 0 ? (
//             <MovieList movies={filteredMovies} />
//           ) : (
//             <p className={css.notFound}>No movies found</p>
//           )}
//         </div>
//       )}
//       <Toaster />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import { getMovieByQuery } from "../../movies-api";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialNameFilmFilter = searchParams.get("name") ?? "";
  const [nameFilmFilter, setNameFilmFilter] = useState(initialNameFilmFilter);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchFilteredMovies() {
      try {
        setLoading(true);
        setError(false);

        if (!nameFilmFilter.trim()) {
          setFilteredMovies([]);
          setLoading(false);
          return;
        }

        const data = await getMovieByQuery(nameFilmFilter);
        setFilteredMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchFilteredMovies();
  }, [nameFilmFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSearchParams({ name: nameFilmFilter });
      setLoading(true);
      setError(false);

      const data = await getMovieByQuery(nameFilmFilter);
      setFilteredMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNameFilmFilter(e.target.value);
  };

  useEffect(() => {
    if (!searchParams.has("name")) {
      setNameFilmFilter("");
    }
  }, [searchParams]);

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          value={nameFilmFilter}
          onChange={handleChange}
          placeholder="Search for movies"
          required
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error && (
        <p className={css.errorTxt}>
          Something went wrong. Please try again later.
        </p>
      )}
      {!loading && !error && filteredMovies.length > 0 && (
        <div className={css.resultsContainer}>
          <MovieList movies={filteredMovies} />
        </div>
      )}
      {!loading && !error && filteredMovies.length === 0 && nameFilmFilter && (
        <p className={css.notFound}>No movies found</p>
      )}
    </div>
  );
}
