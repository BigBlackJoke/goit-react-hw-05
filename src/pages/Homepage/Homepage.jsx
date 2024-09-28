import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTrendMovies } from "../../api";
import css from "../Homepage/Homepage.module.css";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
    const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTrendMovies() {
      setLoading(true);
      try {
        setError(false);
        const data = await fetchTrendMovies();
        setTrendMovies(data);
        setLoading(false);
      } catch {
        setError(true);
        toast.error("Something went wrong. Please, try again!");
      }
    }

    getTrendMovies();
  }, []);

  return (
    <main>
      {!error ? (
        <div>
          <h1 className={css.mainname}>Trending this week</h1>
          {loading && <Loader />}
          {trendMovies.length > 0 && <MovieList movies={trendMovies} />}
          {/* <ul>
            {trendMovies.map((movie) => (
              <li className={css.list} key={movie.id}>
                <Link className={css.links} to={`/movies/${movie.id}`} state={location}>
                  {movie.title}
                </Link>
              </li>
            ))}
            {loading && <Loader />}
          </ul> */}
        </div>
      ) : (
        <p>Something went wrong!</p>
      )}
    </main>
  );
}