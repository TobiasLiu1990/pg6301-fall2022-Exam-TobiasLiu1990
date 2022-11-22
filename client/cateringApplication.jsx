import { Link, Route, Routes } from "react-router-dom";
import { ListPizzas } from "./listPizzas";
import { AddNewPizza } from "./addNewPizza";
import {fetchJSON} from "./lib/fetchJson";

export function ShowMenu({user}) {

  return (
    <div>
      <h1>Our special pizzas of oddities</h1>
      <ul>
        <li>
          <Link to={"/menu"}>Go to our Menu</Link>
        </li>
        <li>
            {user.role === "admin" ? <Link to={"/menu/new"}>Add a new pizza dish</Link> : "Only for administrators"}
        </li>
      </ul>
    </div>
  );
}

export function CateringApplication() {
    const pizzaApi = {
        async listPizzas() {
            return await fetchJSON("/api/menu")
        }
    }

  return (
    <Routes>
      <Route path={"/"} element={<ListPizzas pizzaApi={pizzaApi} />} />
      <Route path={"/new"} element={<AddNewPizza />} />
      <Route path={"*"} element={<h1>Catering side not found!</h1>} />
    </Routes>
  );
}
