import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import LandingPage from "./scenes/LandingPage/LandingPage";
import Navbar from "./components/Navbar";
import Practice from "./scenes/Practice/Practice";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={LandingPage} />
        <Route path="/practice" component={Practice} />
      </div>
    </Router>
  );
}

export default App;
