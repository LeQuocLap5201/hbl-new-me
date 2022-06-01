import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header>menu</header>
      <div>Home</div>
      <div className="list-btn">
        <Link to="update">
          <Button type="primary">update</Button>
        </Link>
        <Link to="ranks">
          <Button type="primary">ranks</Button>
        </Link>
        <Link to="history">
          <Button type="primary">history</Button>
        </Link>
        <Link to="energy">
          <Button type="primary">energy</Button>
        </Link>
      </div>
    </>
  );
}
