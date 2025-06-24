import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Burger from "../components/Burger";
import Header from "../components/Header";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Home from "../components/Home";
import { happyHours } from "../data/happyHours";
import { specialEvents } from "../data/specialEvents";

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
            <Route path="/" element={<Home page={"home"} content={happyHours} />} />
            <Route
              path="/special-events"
              element={<Home page={"events"} content={specialEvents}/>}
            />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
