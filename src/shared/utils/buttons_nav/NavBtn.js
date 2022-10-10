import React, { useEffect } from "react";
import { NavLink, useNavigate, Redirect, useLocation } from "react-router-dom";
import "./nav_btn.scss";
function NavBtn() {
  const Links = [
    {
      name: "Movies ",
      param: "movie",
    },
    {
      name: "TV Shows",
      param: "tv",
    },

    {
      name: "Actors",
      param: "person",
    },
  ];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/yolo");
  };
  const location = useLocation();

  const handleReload = (param) => {
    if (typeof window !== "undefined") {
      window.location.href = `/${param}`;
    }
  };

  return (
    <div>
      <ul className="order">
        {Links.map(({ name, param }) => (
          <li key={param}>
            <NavLink
              to={`/${param}`}
              onClick={() => handleReload(param)}
              className="link"
            >
              <button className="button">{name}</button>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBtn;
