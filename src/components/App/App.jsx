import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../Loader/Loader.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import NotFound from "../../pages/NotFound/NotFound.jsx";

const Homepage = lazy(() => import("../../pages/Homepage/Homepage.jsx"));
const MoviePage = lazy(() => import("../../pages/MoviePage/MoviePage.jsx"));
const MovieSearchPage = lazy(() => import("../../pages/MovieSearchPage/MovieSearchPage.jsx"));
const Cast = lazy(() => import("../Cast/Cast.jsx"));
const Reviews = lazy(() => import("../Reviews/Reviews.jsx"));

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<MovieSearchPage />} />
          <Route path="/movies/:movieId" element={<MoviePage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
