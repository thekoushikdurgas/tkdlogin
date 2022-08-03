import React from 'react';
import "./App.css";
import SunMoon from "./SunMoon";
import Fullscreen from "./Fullscreen";
import Login from "./Login";
import Registration from "./Registration";
import Forgot from "./Forgot";
import Error404 from "./404";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

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
          <Route extact path="/" element={<Navigate to="/login" />} />
          <Route extact path="/login" element={<Login />} />
          <Route extact path="/registration" element={<Registration />} />
          <Route extact path="/forgot" element={<Forgot />} />
          <Route exact path="/404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
      <div className="absolute top-0 right-0 z-[1]"><Fullscreen /></div>
    </>
  )
}
