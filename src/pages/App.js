import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Burger from "../components/Burger";
import Header from "../components/Header";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";

function App() {
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
            <Route path="/" element={<Home page={"home"} />} />
            <Route path="/happenings" element={<Home page={"happenings"} />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
