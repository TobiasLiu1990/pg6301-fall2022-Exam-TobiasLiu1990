import React, { useState } from "react";

function FormInput({ label, value, onChangeValue }) {
  return (
    <div>
      <label>
        <strong>{label}</strong>{" "}
        <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
      </label>
      <br></br>
    </div>
  );
}

export function AddNewPizza() {
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

    await fetch("/api/menu/new", {
      method: "post",
      body: JSON.stringify({ pizza, price, ingredients, allergens }),
      headers: {
        "Content-Type": "application/json",
      }
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

    pizzaApi.addPizza({ pizza, price, ingredients, allergens })   //For test
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
