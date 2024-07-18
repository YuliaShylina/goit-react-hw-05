import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "../src/components/Navigation/Navigation";
import css from "./App.module.css";

const HomePage = lazy(() => import("../src/pages/HomePages/HomePages"));
const MoviesPage = lazy(() => import("../src/pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../src/pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../src/pages/NotFoundPage/NotFoundPage")
);
const MovieCast = lazy(() => import("../src/components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../src/components/MovieReviews/MovieReviews")
);

export default function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<p>Page loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
