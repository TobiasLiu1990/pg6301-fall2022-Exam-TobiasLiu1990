import { Route, Routes } from "react-router-dom";
import React from "react";
import { fetchJSON } from "./fetchJson";
import { useLoader } from "./useLoader";

//List all dishes
//Create dishes if admin staff
//Order dish

function PizzaCard({ pizza: { pizza, price, ingredients, allergens } }) {
  return (
    <div>
      <h4 style={{margin: "0", border: "0"}}>Pizza: {pizza}</h4>
      <h4 style={{margin: "0", border: "0"}}>Price: {price}</h4>
      <h4>
        Ingredients: <IngredientsCard ingredients={ingredients} />
      </h4>
        <h4>
            <div>Allergens: <AllergensCard allergens={allergens}/></div>
        </h4>
    </div>
  );
}

function IngredientsCard({ ingredients }) {
  return (
    <ul style={{margin: "0", border: "0"}}>
      {ingredients.map((i) => (
        <li>{i}</li>
      ))}
    </ul>
  );
}

function AllergensCard({ allergens }) {
  return (
      <ul style={{margin: "0", border: "0"}}>
          {allergens.map((a) => (
              <li>{a}</li>
          ))}
      </ul>
  )
}

export function ListPizzas() {
  const { loading, error, data } = useLoader(async () => {
    return fetchJSON("/api/menu");
  });

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return (
      <div style={{ border: "solid red 1px", background: "red" }}>
        An error has occurred in ShowMenu() : {error.toString()}
      </div>
    );
  }

  async function handleClick(e) {
    e.preventDefault();

    // await fetchJSON("/api/menu", {
    //     method: ""
    // })

    console.log("Dish added");
  }

  return (
    <div>
      <h1>Our attractive menu</h1>

      <div>
        {data.map((pizza) => (
          <PizzaCard key={pizza.pizza} pizza={pizza} />
        ))}
      </div>
    </div>
  );
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
