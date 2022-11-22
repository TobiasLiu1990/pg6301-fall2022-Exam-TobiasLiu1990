import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CateringApplication } from "./cateringApplication";
import { FrontPage } from "./frontPage";
import { Login, RegisterNewAccount } from "./userStatus";
import { fetchJSON } from "./fetchJson";

function Application() {
  const loginApi = {
    async tryUser() {
      return await fetchJSON("/api/login");
    },
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login/*"} element={<Login loginApi={loginApi} />} />
        <Route path={"/register/*"} element={<RegisterNewAccount />} />
        <Route path={"/menu/*"} element={<CateringApplication />} />
        <Route path={"*"} element={<h1>Page not found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
