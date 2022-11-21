import React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { CateringApplication } from "./cateringApplication";

function FrontPage() {
  return (
      <div>
        <h1>Our special pizzas of oddities</h1>

        <ul>
          <li>
            <Link to={"/menu"}> Go to our Menu</Link>
          </li>

          <li>
            <Link to={"/menu/new"}>Add a new pizza dish</Link>
          </li>
        </ul>
      </div>
  );
}

function Login() {
  return null;
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login/*"} element={<Login />} />
        <Route path={"/menu/*"} element={<CateringApplication />} />
        <Route path={"*"} element={<h1>Page not found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
