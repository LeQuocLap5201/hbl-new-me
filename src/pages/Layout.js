import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="container">
        <img srcSet="/img/logo1.png 2x" alt="logo1" />
        <img srcSet="/img/logo2.png 2x" alt="logo2" />
      </header>
      <Outlet />
    </>
  );
}
