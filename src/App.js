import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Lottie from "lottie-react";
import Loading from "./lotties/loading.json";
// import Energy from "./pages/Energy";
// import History from "./pages/History";
// import Home from "./pages/Home";
// import Ranks from "./pages/Ranks";
// import Update from "./pages/Update";
import NotFoundPage from "./pages/NotFoundPage";

const Home = React.lazy(() => import("./pages/Home"));
const Update = React.lazy(() => import("./pages/Update"));
const Ranks = React.lazy(() => import("./pages/Ranks"));
const History = React.lazy(() => import("./pages/History"));
const Energy = React.lazy(() => import("./pages/Energy"));

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
          <Route path="/" element={<Home />} />
          <Route path="update" element={<Update />} />
          <Route path="ranks" element={<Ranks />} />
          <Route path="history" element={<History />} />
          <Route path="energy" element={<Energy />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
