import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Direct Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Login page (future use) */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
