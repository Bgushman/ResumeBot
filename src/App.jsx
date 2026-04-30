import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TailoringMode from "./pages/TailoringMode";
import ATSResults from "./pages/ATSResults";
import AnalysisReport from "./pages/AnalysisReport";
import History from "./pages/History";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tailor" element={<TailoringMode />} />
        <Route path="/results" element={<ATSResults />} />
        <Route path="/report" element={<AnalysisReport />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;