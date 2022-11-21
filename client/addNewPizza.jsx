import { fetchJSON } from "./fetchJson";
import React, { useState } from "react";

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
