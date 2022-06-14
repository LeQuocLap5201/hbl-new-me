import React from "react";
import Lottie from "lottie-react";
import Page404 from "../lotties/page404.json";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Lottie
          animationData={Page404}
          autoPlay={true}
          loop={true}
          style={{ height: "100vw" }}
        />
        <Link
          style={{
            display: "block",
            textAlign: "center",
            color: "#fff",
            fontSize: 20,
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: 1,
          }}
          to="/"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
