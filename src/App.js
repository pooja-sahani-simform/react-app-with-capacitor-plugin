import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import DeviceDetails from "./components/Details";
import "./App.css";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from '@capacitor/core';

const App = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    const setupSafeArea = async () => {
      if (Capacitor.getPlatform() !== 'web') {
      const info = await StatusBar.getInfo();
      setStatusBarHeight(info.height || 50);
      }
      // StatusBar.hide();
    };

    setupSafeArea();
  }, []);

  return (
    <Router>
      <div
        className="app-container"
        style={{
          paddingTop: `${statusBarHeight}px`
        }}
      >
        <header className="app-header">
          <nav className="navbar">
            <div className="brand">Logo</div>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/device-photo">Capture Photo</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/device-photo" element={<DeviceDetails />} />
          </Routes>
        </main>
        <footer className="app-footer"  style={{
          paddingBottom: `${statusBarHeight}px`
        }}>
          &copy; {new Date().getFullYear()} MyApp. All Rights Reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
