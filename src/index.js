import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Teams from "./pages/Teams";
import Schedule from "./pages/Schedule";
import Standings from "./pages/Standings";
import Scores from "./pages/Scores";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="members" element={<Members />} />
          <Route path="teams" element={<Teams />} />
          <Route path="Schedule" element={<Schedule />} />
          <Route path="Standings" element={<Standings />} />
          <Route path="Scores" element={<Scores />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);