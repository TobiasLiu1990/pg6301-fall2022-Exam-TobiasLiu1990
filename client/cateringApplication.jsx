import { Link, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { fetchJSON } from "./fetchJson";
import { useLoader } from "./useLoader";

//List all dishes
//Create dishes if admin staff
//Order dish

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

function PizzaCard({
  pizza: { pizza, price, ingredients, allergens },
  handleClick,
}) {
  return (
    <div>
      <button onClick={handleClick}>Order</button>
      <h3 style={{ margin: "0", border: "0" }}>Pizza: {pizza}</h3>
      <h4 style={{ margin: "0", border: "0" }}>Price: {price}</h4>
      <h4>
        Ingredients: <IngredientsCard ingredients={ingredients} />
      </h4>
      <h4>
        <div>
          Allergens: <AllergensCard allergens={allergens} />
        </div>
      </h4>
    </div>
  );
}

function IngredientsCard({ ingredients }) {
  return (
    <ul style={{ margin: "0", border: "0" }}>
      {ingredients.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function AllergensCard({ allergens }) {
  return (
    <ul style={{ margin: "0", border: "0" }}>
      {allergens.map((a) => (
        <li key={a}>{a}</li>
      ))}
    </ul>
  );
}

export function ListPizzas() {
  const { loading, error, data } = useLoader(async () => {
    return fetchJSON("/api/menu");
  });
  const [order, setOrder] = useState(0);

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
    setOrder(e.target.value++);

    console.log("Dish added" + order);
  }

  return (
    <div>
      <h1>Our attractive menu</h1>

      <div>
        {data.map((pizza) => (
          <PizzaCard
            key={pizza.pizza}
            pizza={pizza}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

function Cart() {
  return null;
}

function AddNewPizza() {
  const [pizza, setPizza] = useState("");
  const [price, setPrice] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [allergen, setAllergen] = useState("");

  let ingredients = [];
  let allergens = [];

  ingredients = ingredient.split(" ");
  allergens = allergen.split(" ");

  async function handleSubmit(e) {
    e.preventDefault();

    await fetchJSON("/api/menu/new", {
      method: "post",
      json: { pizza, price, ingredients, allergens },
    });
  }

  return (
    <div>
      <h1>Add your new pizza</h1>

      <form onSubmit={handleSubmit}>
        <div>
          Pizza name:
          <input value={pizza} onChange={(e) => setPizza(e.target.value)} />
        </div>

        <div>
          Price:
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div>
          Ingredient (Separate with space):
          <input
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </div>

        <div>
          Allergen (Separate with space):
          <input
            value={allergen}
            onChange={(e) => setAllergen(e.target.value)}
          />
        </div>

        <button>Submit Pizza</button>
      </form>
    </div>
  );
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
