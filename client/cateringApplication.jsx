import { Link, Route, Routes } from "react-router-dom";
import { ListPizzas } from "./listPizzas";
import { AddNewPizza } from "./addNewPizza";

export function ShowMenu() {
  return (
    <div>
      <h1>Our special pizzas of oddities</h1>
      <ul>
        <li>
          <Link to={"/menu"}>Go to our Menu</Link>
        </li>
        <li>
          <Link to={"/menu/new"}>Add a new pizza dish</Link>
        </li>
      </ul>
    </div>
  );
}

function Cart() {
  return null;
}

export function CateringApplication() {
  return (
    <Routes>
      <Route path={"/"} element={<ListPizzas />} />
      <Route path={"/new"} element={<AddNewPizza />} />
      <Route path={"/order"} element={<Cart />} />
      <Route path={"*"} element={<h1>Catering side not found!</h1>} />
    </Routes>
  );
}
