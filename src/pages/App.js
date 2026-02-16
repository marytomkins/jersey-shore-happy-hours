import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Page from "../components/Page";
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
            <Route path="/" element={<Home />} />
            <Route path="/happyhours" element={<Page page={"happyhours"} />} />
            <Route path="/happyhours/now" element={<Page page={"happyhours"} />} />
            <Route path="/events" element={<Page page={"events"} />} />
            <Route path="/specials" element={<Page page={"specials"} />} />
            <Route path="/contact" element={<Feedback />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
