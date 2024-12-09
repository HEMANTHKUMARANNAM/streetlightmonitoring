import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ControlLights from "./Components/ControlLights";
import DamagedLights from "./Components/DamagedLights";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter basename="/streetlightmonitoring">
      <div className="d-flex">
        {/* Sidebar */}
        <nav
          className="bg-light border-end vh-100"
          style={{ width: "250px", position: "fixed" }}
        >
          <h2 className="text-center py-3">StreetLight App</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="bi bi-lightbulb"></i> Control Lights
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/damaged" className="nav-link">
                <i className="bi bi-exclamation-triangle-fill"></i> View Damaged Lights
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="container-fluid" style={{ marginLeft: "250px" }}>
          <Routes>
            <Route path="/" element={<ControlLights />} />
            <Route path="/damaged" element={<DamagedLights />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
