import "../App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Burger from "../components/Burger";
import Header from "../components/Header";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Home from "../components/Home";

function App() {
  const [happyHours, setHappyHours] = useState([]);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/marytomkins/a25ef825b3571312111b34581c0f28e1/raw/happyHours.json?ts=" +
        Date.now()
    )
      .then((res) => res.json())
      .then((json) => json.sort((a, b) => a.name.localeCompare(b.name)))
      .then((data) => setHappyHours(data));
  }, []);

  return (
    <Router>
      <div className="App h-max flex flex-col">
        <Analytics />
        <Burger />
        <div>
          <Header />
        </div>
        <div className="main-content flex-grow">
          <Routes>
            <Route path="/" element={<Home happyHours={happyHours} />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
