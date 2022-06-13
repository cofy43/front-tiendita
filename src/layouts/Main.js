import { HashRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../components/sidebar/sidebar";
import Home from "../components/home/Home";
import Contact from "../components/contact/Contact";
import About from "../components/about/About";

import "./main.css";

function Main() {
  return (
    <div className="app">
      <HashRouter>
        <div className="sidebar">
          <Sidebar />
        </div>        
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default Main;
