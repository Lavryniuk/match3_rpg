import { NavLink } from "react-router-dom";

import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <NavLink to="/inventory" className="footer__btn">
        Inventory
      </NavLink>
      <NavLink to="/" className="footer__btn">
        Home
      </NavLink>
      <NavLink to="/camp" className="footer__btn">
        Camp
      </NavLink>
    </footer>
  );
}
