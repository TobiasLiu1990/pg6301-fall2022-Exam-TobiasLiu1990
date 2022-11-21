import { Link, Route, Routes } from "react-router-dom";
import React from "react";

//List all dishes
//Create dishes if admin staff
//Order dish

export function ShowMenu() {

}

function ListPizzas() {
  return null;
}

function Cart() {
  return null;
}

function AddNewPizzaDish() {
  return null;
}

export function CateringApplication() {
  return (
    <Routes>
      <Route path={"/"} element={<ListPizzas />} />
      <Route path={"/order"} element={<Cart />} />
      <Route path={"/new"} element={<AddNewPizzaDish />} />
      <Route path={"*"} element={<h1>Catering side not found!</h1>} />
    </Routes>
  );
}
