import React from "react";
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils";
import {ListPizzas} from "../cateringApplication";


const pizzas = [
  {
    pizza: "pizza 1",
    price: 100,
    ingredients: ["tomato", "cheese"],
    allergens: ["casein"],
  },
  {
    pizza: "pizza 2",
    price: 500,
    ingredients: ["tomato", "cheese", "peanuts"],
    allergens: ["casein", "nuts"]
  },
];

describe("ListPizzas component", () => {
  it("should show loading screen", () => {
    const element = document.createElement("div");
    ReactDOM.render(<ListPizzas/>, element);

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show pizzas", () => {
    const element = document.createElement("div");

    await act(async () => {
      ReactDOM.render(<ListPizzas listPizzas={() => pizzas}/>, element);
    });

  })



});