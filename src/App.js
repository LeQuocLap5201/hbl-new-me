import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Lottie from "lottie-react";
import Loading from "./lotties/loading.json";
import NotFoundPage from "./pages/NotFoundPage";

const Home = React.lazy(() => import("./pages/Home"));
const Ranks = React.lazy(() => import("./pages/Ranks"));
const History = React.lazy(() => import("./pages/History"));
const Energy = React.lazy(() => import("./pages/Energy"));
const Gift = React.lazy(() => import("./pages/Gift"));

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lottie animationData={Loading} autoPlay={true} loop={true} />
          </div>
        }
      >
        <header className="container">
          <img src="/img/logo1.png" alt="logo1" />
          <img src="/img/logo2.png" alt="logo2" />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ranks" element={<Ranks />} />
          <Route path="history" element={<History />} />
          <Route path="gift" element={<Gift />} />
          <Route path="energy" element={<Energy />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
