//Root contains the things that never change, like the navigation bar at the top, never changes no matter where you are on a page

import { Outlet, Link } from "react-router-dom";
import React from "react";

export default function Root() {
  return (
    <>
      <nav>
        <Link to="/clients">Clients | </Link>
        <Link to="/products">Products | </Link>
        <Link to="/orders">Orders</Link>
        <Link to="/fiddle">Fiddle</Link>

      </nav>
      <Outlet />
    </>
  );
}