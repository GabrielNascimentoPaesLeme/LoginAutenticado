import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Outlet id="title" />
    </div>
  );
}

export default App;
