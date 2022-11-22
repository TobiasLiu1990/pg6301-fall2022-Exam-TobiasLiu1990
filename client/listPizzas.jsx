import React, { useState } from "react";
import { useLoader } from "./useLoader";

export function PizzaCard({
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
  const [order, setOrder] = useState(0);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return (
      <div id="error-list-pizzas-div" style={{ border: "solid red 1px", background: "red" }}>
        An error has occurred in ShowMenu(): {error.toString()}
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
