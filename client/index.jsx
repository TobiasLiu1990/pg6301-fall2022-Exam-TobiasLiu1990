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
  //List all dishes
  //Create dishes if admin staff
  //Order dish

  return (
    <Routes>
      <Route path={"/"} element={<ListPizzas />} />
      <Route path={"/order"} element={<Cart />} />
      <Route path={"/new"} element={<AddNewPizzaDish />} />
      <Route path={"*"} element={<h1>Catering side not found!</h1>} />
    </Routes>
  );
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
