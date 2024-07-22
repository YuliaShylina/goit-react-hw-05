import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";
import { getMovieByQuery } from "../../movies-api.js";

// export default function MoviesPage() {
//   const [movies, setMovies] = useState([]);
//   const [query, setQuery] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [loading, setLoading] = useState(false);
//   const [showNotFound, setShowNotFound] = useState(false);

//   useEffect(() => {
//     const queryParam = searchParams.get("query");
//     if (queryParam) {
//       setQuery(queryParam);
//       handleSearch(queryParam);
//     }
//   }, [searchParams]);

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//     setShowNotFound(false);
//   };

//   const handleSearch = async (searchQuery) => {
//     if (!searchQuery.trim()) return;

//     try {
//       setLoading(true);
//       const data = await getMovieByQuery(searchQuery);
//       setMovies(data);
//       setShowNotFound(data.length === 0);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     await setSearchParams({ query });
//     await handleSearch(query);
//     setQuery("");
//   };

//   return (
//     <div className={css.container}>
//       <form onSubmit={handleSubmit} className={css.form}>
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           placeholder="Search for movies"
//         />
//         <button type="submit" className={css.btn}>
//           Search
//         </button>
//       </form>
//       {loading && <Loader />}
//       {!loading && movies.length > 0 && <MovieList movies={movies} />}
//       {!loading && showNotFound && (
//         <p className={css.notFound}>No movies found</p>
//       )}
//     </div>
//   );
// }

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const initialNameFilmFilter = searchParams.get("name") ?? "";

  useEffect(() => {
    if (!initialNameFilmFilter) return;
    async function fetchFilteredMovies() {
      try {
        setLoading(true);
        setError(false);

        const data = await getMovieByQuery(initialNameFilmFilter);
        setFilteredMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchFilteredMovies();
  }, [initialNameFilmFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ name: e.target.elements.search.value.trim() });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="search"
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

      {!loading && !error && filteredMovies.length === 0 && (
        <p className={css.notFound}>No movies found</p>
      )}
    </div>
  );
}
