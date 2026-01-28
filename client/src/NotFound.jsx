import React from "react";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div>404 NotFound</div>
      <NavLink to="/">return to post</NavLink>
    </>
  );
}

export default NotFound;
