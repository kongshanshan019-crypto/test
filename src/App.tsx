import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Spring from "@/pages/Spring";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spring" element={<Spring />} />
      </Routes>
    </Router>
  );
}
