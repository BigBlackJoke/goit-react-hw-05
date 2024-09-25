import { useSearchParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieByKeyword } from "../../api";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";

export default function MovieSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName") ?? "";
  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMoviesList([]);
    setLoading(true);
    const getMovieByKeyword = async (movieName) => {
      try {
        const data = await fetchMovieByKeyword(movieName);
        setError(false);
        setMoviesList(data);
        setLoading(false);
      } catch {
        setLoading(false);
        toast.error("Something went wrong. Please, try again!");
      }
    };
    getMovieByKeyword(movieName);
  }, [movieName]);

  const handleSubmit = (value) => {
    setSearchParams({ movieName: value });
  };

  return (
    <main>
      <div>
        <SearchBar search={handleSubmit} />
        {error && (
          <p>Sorry, we can't find movie like this. Please, try again!</p>
        )}
        <MovieList movies={moviesList} />
        {loading && <Loader />}
      </div>
    </main>
  );
}