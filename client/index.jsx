import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function FrontPage() {
  return null;
}

function Login() {
  return null;
}

function CateringApplication() {
  return null;
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/menu"} element={<CateringApplication />} />
        <Route path={"*"} element={<h1>Page not found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
