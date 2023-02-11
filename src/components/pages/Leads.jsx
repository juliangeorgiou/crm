import React from 'react';
import { Outlet, Link, useRouteLoaderData } from "react-router-dom";

export default function Leads() {
    return (
    <div>
        <div>
          Leads
        </div>
        <Outlet />
    </div>
    );
  }