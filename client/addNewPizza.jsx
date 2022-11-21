import { fetchJSON } from "./fetchJson";
import React, { useState } from "react";

function FormInput({ label, value, onChangeValue }) {
  return (
    <>
      <label>
        <strong>{label}</strong>{" "}
        <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
      </label>
      <br></br>
    </>
  );
}

export function AddNewPizza({ pizzaApi }) {
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

    pizzaApi.addPizza({ pizza, price, ingredients, allergens })

    await fetchJSON("/api/menu/new", {
      method: "post",
      json: { pizza, price, ingredients, allergens },
    });
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
