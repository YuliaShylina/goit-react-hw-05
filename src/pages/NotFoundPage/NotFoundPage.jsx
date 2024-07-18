import css from "./NotFoundPage.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const makeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function NotFoundPage() {
  return (
    <div className={css.notFoundTxt}>
      <p>Ooops... Page is not found</p>
      <NavLink to="/" className={makeLinkClass}>
        Come back to home page
      </NavLink>
    </div>
  );
}
