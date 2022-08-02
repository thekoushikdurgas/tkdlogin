import React from 'react';
import "./App.css";
import SunMoon from "./SunMoon";
import Fullscreen from "./Fullscreen";
import Login from "./Login";
import Registration from "./Registration";
import Forgot from "./Forgot";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";

export default function TKD() {
  // window.oncontextmenu = function () {
  //   console.log("Right Click Disabled");
  //   return false;
  // };
  return (
    <>
      <SunMoon />
      <Router>
          <Routes>
              <Route extact path="/" element={<Login />} />
              <Route extact path="/registration" element={<Registration />} />
              <Route extact path="/forgot" element={<Forgot />} />
              <Route path="*" element={<Navigate to='http://404.thekoushikdurgas.in/' />} />
          </Routes>
      </Router>
      <div className="absolute top-0 right-0 z-[1]"><Fullscreen /></div>
    </>
  )
}
