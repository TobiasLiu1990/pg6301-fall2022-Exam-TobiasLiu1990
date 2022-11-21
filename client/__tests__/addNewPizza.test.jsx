import ReactDOM from "react-dom";
import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { AddNewPizza } from "../addNewPizza";

describe("add pizza component", () => {
  it("should show pizza form", async () => {
    const element = document.createElement("div");
    await act(async () => ReactDOM.render(<AddNewPizza />, element));

    expect(element.innerHTML).toMatchSnapshot();

    const inputLabels = Array.from(
      element.querySelectorAll("form label strong")
    ).map((label) => label.innerHTML);

    expect(inputLabels).toEqual([
      "Pizza: ",
      "Price: ",
      "Ingredients (Separate by space): ",
      "Allergen (Separate with space): ",
    ]);
  });

  it("should add a pizza on submit", async () => {
    //Mock function
    const addPizza = jest.fn();

    const element = document.createElement("div");
    await act(async () =>
      ReactDOM.render(<AddNewPizza pizzaApi={{ addPizza }} />, element)
    );

    //Send the title declared above to onChange. Select the first form input, which is title.
    Simulate.change(element.querySelector("form div:nth-of-type(1) input"), {
        target: {value: "Tasty pizza"},
    });

    Simulate.submit(element.querySelector("form"));

    expect(addPizza).toBeCalledWith({
      pizza: "Tasty pizza",
      price: "",
      ingredients: [""],
      allergens: [""]
    });


  });
});













