import { Link, useLocation } from "react-router-dom";
import css from "../MovieList/MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul>
      {movies.map((item) => {
        return (
          <li key={item.id}>
            <Link className={css.link} to={`/movies/${item.id}`} state={{ from: location }}>
              {item.title}
            </Link>

          </li>
        );
      })}
    </ul>
  );
}