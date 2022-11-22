import React, { useState } from "react";
import { useLoader } from "./lib/useLoader";
import { useNavigate } from "react-router-dom";

export function PizzaCard({ pizza: { pizza, price, ingredients, allergens } }) {
  return (
    <div>
      <h3 style={{ margin: "0", border: "0" }}>Pizza: {pizza}</h3>
      <h4 style={{ margin: "0", border: "0" }}>Price: {price}</h4>
      <h4>
        Ingredients: <IngredientsCard ingredients={ingredients} />
      </h4>
      <h4>
        Allergens: <AllergensCard allergens={allergens} />
      </h4>
    </div>
  );
}

export function IngredientsCard({ ingredients }) {
  return (
    <ul style={{ margin: "0", border: "0" }}>
      {ingredients.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

export function AllergensCard({ allergens }) {
  return (
    <ul style={{ margin: "0", border: "0" }}>
      {allergens.map((a) => (
        <li key={a}>{a}</li>
      ))}
    </ul>
  );
}

export function ListPizzas({ pizzaApi }) {
  const { loading, error, data } = useLoader(async () => {
    return await pizzaApi.listPizzas();
  });
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return (
      <div
        id="error-list-pizzas-div"
        style={{ border: "solid red 1px", background: "red" }}
      >
        An error has occurred in ShowMenu(): {error.toString()}
      </div>
    );
  }

  function handleSubmitBack(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmitBack}>
        <button>Go back to start page</button>
      </form>

      <hr></hr>

      <h1>Our attractive menu</h1>

      <div>
        {data.map((pizza) => (
          <PizzaCard key={pizza.pizza} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}
