import ReactDOM from "react-dom";
import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { AddNewPizza, AddNewPizzaForTest } from "../addNewPizza";
import { MemoryRouter } from "react-router-dom";

describe("add pizza component", () => {
  it("should show pizza form", async () => {
    const element = document.createElement("div");
    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <AddNewPizza />
        </MemoryRouter>,
        element
      )
    );

    expect(element.innerHTML).toMatchSnapshot();

    const inputLabels = Array.from(
      element.querySelectorAll("form label strong")
    ).map((label) => label.innerHTML);

    expect(inputLabels).toEqual([
      "Pizza: ",
      "Price: ",
      "Ingredients (Separate by ,): ",
      "Allergen (Separate with ,): ",
    ]);
  });

  it("should add a pizza on submit", async () => {
    //Mock function
    const addPizza = jest.fn();
    const element = document.createElement("div");

    await act(async () =>
      ReactDOM.render(<AddNewPizzaForTest pizzaApi={{ addPizza }} />, element)
    );

    //Send the title declared above to onChange. Select the first form input, which is title.
    Simulate.change(element.querySelector("form div:nth-of-type(1) input"), {
      target: { value: "Tasty pizza" },
    });
    Simulate.change(element.querySelector("form div:nth-of-type(2) input"), {
      target: { value: 500 },
    });
    Simulate.change(element.querySelector("form div:nth-of-type(3) input"), {
      target: { value: "cheese eggs" },
    });
    Simulate.change(element.querySelector("form div:nth-of-type(4) input"), {
      target: { value: "eggs casein" },
    });

    Simulate.submit(element.querySelector("form"));

    expect(addPizza).toBeCalledWith({
      pizza: "Tasty pizza",
      price: 500,
      ingredients: ["cheese", "eggs"],
      allergens: ["eggs", "casein"],
    });
  });
});
