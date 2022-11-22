import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CateringApplication } from "./cateringApplication";
import { FrontPage } from "./frontPage";
import { fetchJSON } from "./lib/fetchJson";
import {Login} from "./login";
import {RegisterNewAccount} from "./registerNewAccount";

function Application() {

  const registerApi = {
    async addUser() {
      return await fetchJSON("/api/login/new");
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login/*"} element={<Login />} />
        <Route path={"/register/*"} element={<RegisterNewAccount registerApi={registerApi} />} />
        <Route path={"/menu/*"} element={<CateringApplication />} />
        <Route path={"*"} element={<h1>Page not found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
