import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Lottie from "lottie-react";
import Loading from "./lotties/loading.json";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./pages/Layout";

const Home = React.lazy(() => import("./pages/Home"));
const Ranks = React.lazy(() => import("./pages/Ranks"));
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
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="ranks" element={<Ranks />} />
            <Route path="gift" element={<Gift />} />
            <Route path="energy" element={<Energy />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
