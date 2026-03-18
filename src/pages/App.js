import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Home from "../components/Home";
import Page from "../components/Page";
import Header from "../components/Header";
import Specials from "../components/Specials";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App h-max flex flex-col">
        <Analytics />
        <Header />
        <div className="blank-space nav:h-[17vh] h-[12vh]"></div>
        <div className="main-content flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/happyhours" element={<Page page={"happyhours"} />} />
            <Route path="/events" element={<Page page={"events"} />} />
            <Route path="/contact" element={<Feedback />} />
            {/* SPECIALS */}
            <Route path="/specials" element={<Specials />} />
            <Route
              path="/specials/wine"
              element={<Page page={"specials"} special={"wine"} />}
            />
            <Route
              path="/specials/margarita"
              element={<Page page={"specials"} special={"margarita"} />}
            />
            <Route
              path="/specials/martini"
              element={<Page page={"specials"} special={"martini"} />}
            />
            {/* DAY LINKS */}
            <Route
              path="/sunday-happy-hours"
              element={<Page page={"happyhours"} day={"Sunday"} />}
            />
            <Route
              path="/monday-happy-hours"
              element={<Page page={"happyhours"} day={"Monday"} />}
            />
            <Route
              path="/tuesday-happy-hours"
              element={<Page page={"happyhours"} day={"Tuesday"} />}
            />
            <Route
              path="/wednesday-happy-hours"
              element={<Page page={"happyhours"} day={"Wednesday"} />}
            />
            <Route
              path="/thursday-happy-hours"
              element={<Page page={"happyhours"} day={"Thursday"} />}
            />
            <Route
              path="/friday-happy-hours"
              element={<Page page={"happyhours"} day={"Friday"} />}
            />
            <Route
              path="/saturday-happy-hours"
              element={<Page page={"happyhours"} day={"Saturday"} />}
            />
            {/* TOWN LINKS */}
            <Route
              path="/asbury-park-happy-hours"
              element={<Page page={"happyhours"} town={"Asbury Park"} />}
            />
            <Route
              path="/ocean-grove-happy-hours"
              element={<Page page={"happyhours"} town={"Ocean Grove"} />}
            />
            <Route
              path="/bradley-beach-happy-hours"
              element={<Page page={"happyhours"} town={"Bradley Beach"} />}
            />
            <Route
              path="/avon-by-the-sea-happy-hours"
              element={<Page page={"happyhours"} town={"Avon-by-the-sea"} />}
            />
            <Route
              path="/belmar-happy-hours"
              element={<Page page={"happyhours"} town={"Belmar"} />}
            />
            <Route
              path="/spring-lake-happy-hours"
              element={<Page page={"happyhours"} town={"Spring Lake"} />}
            />
            <Route
              path="/manasquan-happy-hours"
              element={<Page page={"happyhours"} town={"Manasquan"} />}
            />
            <Route
              path="/sea-girt-happy-hours"
              element={<Page page={"happyhours"} town={"Sea Girt"} />}
            />
            <Route
              path="/brielle-happy-hours"
              element={<Page page={"happyhours"} town={"Brielle"} />}
            />
            <Route
              path="/point-pleasant-happy-hours"
              element={<Page page={"happyhours"} town={"Point Pleasant"} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
