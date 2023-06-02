import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Calendar from "./Calendar";

function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}
export default RouterPage;
