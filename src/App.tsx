import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Leaderboard from "./pages/Leaderboard";
import Compare from "./pages/Compare";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallet/:address" element={<Wallet />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </>
  );
}