import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ListPizzas } from "./listPizzas";
import { AddNewPizza } from "./addNewPizza";
import { fetchJSON } from "./lib/fetchJson";

export function ShowMenu({ user }) {
    checkUserRole = user.role;

  return (
    <div>
      <h1>Our special pizzas of oddities</h1>
      <ul>
        <li>
          <Link to={"/menu"}>Go to our Menu</Link>
        </li>
        <li>
          {user.role === "admin" ? (
            <Link to={"/menu/new"}>Add a new pizza dish</Link>
          ) : (
            "Only for administrators"
          )}
        </li>
      </ul>
    </div>
  );
}

let checkUserRole;

export function CateringApplication() {
  const pizzaApi = {
    async listPizzas() {
      return await fetchJSON("/api/menu");
    },
  };

  return (
    <Routes>
      <Route path={"/"} element={<ListPizzas pizzaApi={pizzaApi} />} />
        { checkUserRole === "admin" ? <Route path={"/new"} element={<AddNewPizza />} /> : ""}
    </Routes>
  );
}
