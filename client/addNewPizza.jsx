import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FormInput} from "./lib/formInput";
import {fetchJSON} from "./lib/fetchJson";

export function AddNewPizza() {
  const [pizza, setPizza] = useState("");
  const [price, setPrice] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [allergen, setAllergen] = useState("");
  const navigate = useNavigate();

  let ingredients = [];
  let allergens = [];

  ingredients = ingredient.split(" ");
  allergens = allergen.split(" ");

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("/");

    await fetchJSON("/api/menu/new", {
      method: "post",
      json: ({pizza, price, ingredients, allergens}),
    });
  }

  function handleSubmitBack(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmitBack}>
        <button>Go Back to start-page</button>
      </form>

      <hr></hr>

      <h1>Add your new pizza</h1>

      <form onSubmit={handleSubmit}>
        <FormInput label={"Pizza: "} value={pizza} onChangeValue={setPizza} />
        <FormInput label={"Price: "} value={price} onChangeValue={setPrice} />
        <FormInput
          label={"Ingredients (Separate by space): "}
          value={ingredient}
          onChangeValue={setIngredient}
        />
        <FormInput
          label={"Allergen (Separate with space): "}
          value={allergen}
          onChangeValue={setAllergen}
        />
        <button>Submit Pizza</button>
      </form>
    </div>
  );
}

export function AddNewPizzaForTest({ pizzaApi }) {
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

    pizzaApi.addPizza({ pizza, price, ingredients, allergens }); //For test
  }

  return (
    <div>
      <h1>Add your new pizza</h1>

      <form onSubmit={handleSubmit}>
        <FormInput label={"Pizza: "} value={pizza} onChangeValue={setPizza} />
        <FormInput label={"Price: "} value={price} onChangeValue={setPrice} />
        <FormInput
          label={"Ingredients (Separate by space): "}
          value={ingredient}
          onChangeValue={setIngredient}
        />
        <FormInput
          label={"Allergen (Separate with space): "}
          value={allergen}
          onChangeValue={setAllergen}
        />

        <button>Submit Pizza</button>
      </form>
    </div>
  );
}
