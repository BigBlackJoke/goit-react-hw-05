import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../api";
import toast from "react-hot-toast";

export default function Cast() {
  const [castList, setCastList] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieCast = async (movieId) => {
      try {
        setError(false);
        const data = await fetchMovieCast(movieId);
        setCastList(data);
      } catch {
        setError(true);
        toast.error("Something went wrong. Please, try again!");
      }
    };
    getMovieCast(movieId);
  }, [movieId]);

  return (
    <>
      {!error ? (
        <ul>
          {castList.length > 0
            ? castList.map(({ id, name, profile_path, character }) => (
                <li key={id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                    alt="actor"
                    loading="lazy"
                    width="120"
                  />
                  <h3>{name}</h3>
                  <p> Character: {character}</p>
                </li>
              ))
            : "Sorry, no info"}
        </ul>
      ) : (
        "Something went wrong!"
      )}
    </>
  );
}