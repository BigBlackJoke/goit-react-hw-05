import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Loader/Loader";
import css from "../Navigation/Navigation.module.css";

export default function Navigation() {
  return (
    <header>
      <nav className={css.container}>
        <NavLink className={css.nav} to="/">Home</NavLink>
        <NavLink className={css.nav} to="/movies">Movies</NavLink>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </nav>
    </header>
  );
}