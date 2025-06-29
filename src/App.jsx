import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MySummaries from "./pages/MySummaries";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summaries" element={<MySummaries />} />
      </Routes>
    </BrowserRouter>
  );
}
