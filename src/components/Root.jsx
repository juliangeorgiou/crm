//Root contains the things that never change, like the navigation bar at the top, never changes no matter where you are on a page

import { Outlet, Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const AppWindow = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  gap: 40px;
  padding: 2em
`

const NavBar = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 2em
`

export default function Root() {
  return (
    <AppWindow style={{"background-color": "#222", "color": "#e6e6e6"}}>
      <NavBar >
        <div>
          <Link to="/clients"><img width="50" height="50" src="../static/client.png"></img><font size="+1">Clients</font></Link>
        </div>
        <div>
          <Link to="/products"><img width="50" height="50" src="../static/product.png"></img><font size="+1">Products</font></Link>
        </div>
        <div>
          <Link to="/orders"><img width="50" height="50" src="../static/order.png"></img><font size="+1">Orders</font></Link>
        </div>
      </NavBar>
      <Outlet />
    </AppWindow>
  );
}