import * as React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

const Links = [
  {
    name: "Movies List",
    param: "/",
  },
  {
    name: "Wish List",
    param: "wishlist",
  },
];

export default function Navbar() {
  return (
    <div className="header">
      <div className="inner-content">
        <ul className="nav-links">
          {Links.map(({ name, param }) => (
            <li key={param}>
              <NavLink to={`/${param}`} className="logo">
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
