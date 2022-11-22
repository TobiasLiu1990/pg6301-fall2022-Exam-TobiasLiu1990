import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ListPizzas } from "../listPizzas";

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
    allergens: ["casein", "nuts"],
  },
];

//Test useLoader
describe("ListPizzas component", () => {
  it("should show loading screen", () => {
    const element = document.createElement("div");
    ReactDOM.render(<ListPizzas />, element);

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show pizzas", async () => {
    const element = document.createElement("div");

    await act(async () => {
      ReactDOM.render(
        <ListPizzas
          pizzaApi={{
            listPizzas: () => new Promise((resolve) => resolve(pizzas)),
          }}
        />,
        element
      );
    });

    expect(element.querySelector("h3").innerHTML).toEqual(
      "Pizza: " + pizzas[0].pizza
    );

    expect(element.querySelector("h4").innerHTML).toEqual(
        "Price: " + pizzas[0].price,
        "Ingredients:" + pizzas[0].ingredients,
        "Allergens: " + pizzas[0].allergens
    );

    expect(
      Array.from(element.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual(["Pizza: pizza 1", "Pizza: pizza 2"]);

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show error message", async () => {
    const element = document.createElement("div");

    await act(async () => {
      ReactDOM.render(
        <ListPizzas
          pizzaApi={{
            listPizzas: () =>
              new Promise((resolve, reject) => {
                reject(new Error("Failed to fetch"));
              }),
          }}
        />,
        element
      );
    });

    expect(element.querySelector("#error-list-pizzas-div").innerHTML).toContain(
      "Failed to fetch"
    );
  });
});
