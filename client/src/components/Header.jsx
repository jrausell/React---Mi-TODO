import React from "react";
import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  const { user, logout } = useAuth();
  let activeStyle = {
    textDecoration: "underline",
  };
  return (
    <div id="header" className="w-full flex shadow-md p-4 z-20">
      <div className="flex w-full justify-center items-center ">
        <h1 className="text-xl font-semibold mr-3">
          <NavLink
            to="/in/todo"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            {props.title}
          </NavLink>
        </h1>
        <p className="text-sm">{props.subtitle}</p>

        <div className="ml-2 place-self-end">
          <NavLink
            to="/in/profile"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            {user.given_name}
          </NavLink>
          |
          <NavLink
            to="/in/settings"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            [**]
          </NavLink>
        </div>
      </div>
      <div>
        <div id="signInDiv"></div>
      </div>
    </div>
  );
}
