import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Header from "../components/Header";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <div className="App h-max flex flex-col">
        <Analytics />
        <Header />
        <div className="blank-space nav:h-[17vh] h-[12vh]"></div>
        <div className="main-content flex-grow">
          <Routes>
            <Route path="/" element={<Home page={"home"} />} />
            <Route path="/events" element={<Home page={"events"} />} />
            <Route path="/specials" element={<Home page={"specials"} />} />
            <Route path="/contact" element={<Feedback />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
