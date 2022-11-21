import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { fetchJSON } from "./fetchJson";
import { useLoader } from "./useLoader";

//List all dishes
//Create dishes if admin staff
//Order dish

function PizzaCard({
  pizza: { pizza, price, ingredients, allergens },
  handleClick,
}) {
  return (
    <div>
      <h4 style={{ margin: "0", border: "0" }}>Pizza: {pizza}</h4>
      <h4 style={{ margin: "0", border: "0" }}>Price: {price}</h4>
      <h4>
        Ingredients: <IngredientsCard ingredients={ingredients} />
      </h4>
      <h4>
        <div>
          Allergens: <AllergensCard allergens={allergens} />
        </div>
      </h4>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

function IngredientsCard({ ingredients }) {
  return (
    <ul style={{ margin: "0", border: "0" }}>
      {ingredients.map((i) => (
        <li id={i}>{i}</li>
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

export function ListPizzas({ pizzaApi }) {
  const [order, setOrder] = useState(0);
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
    setOrder(e.target.value);

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

  const [ingredients, setIngredients] = useState([]);
  const [allergens, setAllergens] = useState([]);

  function handleSubmitPizza(e) {
    e.preventDefault();
    setPizza(e.target.value);
    setPrice(e.target.value);
  }

  function handleSubmitIngredients(e) {
    e.preventDefault();
    setIngredient(e.target.value);
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  }

  function handleSubmitAllergens(e) {
    e.preventDefault();
    setAllergen(e.target.value);
    setAllergens((prevAllergens) => [...prevAllergens, allergen]);
  }

  return (
    <div>
      <h1>Add your new pizza</h1>

      <form onSubmit={handleSubmitPizza}>
        <div>
          Pizza name:
          <input value={pizza} onChange={(e) => setPizza(e.target.value)} />
        </div>
        <div>
          Price:
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <button>Submit Pizza</button>
        </div>
      </form>

      <br></br>

      <form onSubmit={handleSubmitIngredients}>
        <div>
          Ingredient:
          <input
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <button>Submit ingredients</button>
        </div>
      </form>
      <form onSubmit={handleSubmitAllergens}>
        <div>
          Allergen:
          <input
            value={allergen}
            onChange={(e) => setAllergen(e.target.value)}
          />
          <button>Submit allergens</button>
        </div>
      </form>
    </div>
  );
}

export function CateringApplication() {
  return (
    <Routes>
      <Route path={"/"} element={<ListPizzas />} />
      <Route path={"/order"} element={<Cart />} />
      <Route path={"/new"} element={<AddNewPizza />} />
      <Route path={"*"} element={<h1>Catering side not found!</h1>} />
    </Routes>
  );
}
