import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api";
import { useState, useEffect, Suspense, useRef } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import css from "../MoviePage/MoviePage.module.css";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";

export default function MoviePage() {
  const [movieDetails, setMovieDetails] = useState({});
  const location = useLocation();
  const { movieId } = useParams();
  const backLink = useRef(location.state ?? "/movies");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  let isMounted = true;
  const getMovieDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchMovieDetails(movieId);
      if (isMounted) {
        setMovieDetails(data);
        setLoading(false);
      }
    } catch {
      if (isMounted) {
        toast.error("Something went wrong. Please, try again!");
        setLoading(false);
      }
    }
  };
  getMovieDetails();
  return () => (isMounted = false);
}, [movieId]);


  const { original_title, overview, genres, poster_path, vote_average } =
    movieDetails;
  const scoreToFixed = Number(vote_average).toFixed(2);

  return (
    <main className={css.main}>
      <div className={css.container}>
        <Link className={css.backarrow} to={backLink.current}>
          <IoArrowBackCircleOutline />
          Go back
        </Link>
        {loading && <Loader />}
        <div>
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : ''}
            loading="lazy"
            alt={original_title || 'No image available'}
            className={css.movieimage}
          />

          <div>
            <h1 className={css.title}>{original_title}</h1>
            <p>User score: {scoreToFixed}</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <ul>
              {genres && genres.length > 0 ? (genres.map(({ id, name }) => <li key={id}>{name}</li>)) : (<li>No genres available</li>)}
            </ul>

          </div>
        </div>
        <div>
          <h3>Additional information</h3>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}