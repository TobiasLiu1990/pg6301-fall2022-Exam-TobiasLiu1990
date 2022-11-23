import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { AllergensCard, IngredientsCard, ListPizzas } from "../listPizzas";
import { MemoryRouter } from "react-router-dom";

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
        ReactDOM.render(
            <MemoryRouter>
                <ListPizzas />
            </MemoryRouter>,
            element
        );

        expect(element.innerHTML).toMatchSnapshot();
    });

    it("should show pizzas", async () => {
        const element = document.createElement("div");

        await act(async () => {
            ReactDOM.render(
                <MemoryRouter>
                    <ListPizzas
                        pizzaApi={{
                            listPizzas: () => new Promise((resolve) => resolve(pizzas)),
                        }}
                    />
                </MemoryRouter>,
                element
            );
        });

        expect(element.querySelector("h3").innerHTML).toEqual(
            "Pizza: " + pizzas[0].pizza
        );
        expect(element.querySelector("h4:nth-of-type(1)").innerHTML).toEqual(
            "Price: " + pizzas[0].price
        );

        const checkIngredient = Array.from(element.querySelectorAll("li")).map(
            (list) => list.innerHTML
        );
        expect(checkIngredient).toContain(pizzas[0].ingredients[0]);

        const checkAllergen = Array.from(element.querySelectorAll("li")).map(
            (list) => list.innerHTML
        );
        expect(checkAllergen).toContain(pizzas[0].allergens[0]);

        expect(
            Array.from(element.querySelectorAll("h3")).map((e) => e.innerHTML)
        ).toEqual(["Pizza: pizza 1", "Pizza: pizza 2"]);
    });

    it("should show ingredients form", () => {
        const element = document.createElement("div");
        const ingredients = ["eggs", "cheese"];
        ReactDOM.render(<IngredientsCard ingredients={ingredients} />, element);
    });

    it("should show ingredients", () => {
        const element = document.createElement("div");
        const ingredients = ["eggs", "cheese"];
        ReactDOM.render(<IngredientsCard ingredients={ingredients} />, element);

        expect(element.querySelector("li:nth-of-type(1)").innerHTML).toEqual(
            ingredients[0]
        );
        expect(element.querySelector("li:nth-of-type(2)").innerHTML).toEqual(
            ingredients[1]
        );
    });

    it("should show allergens form", () => {
        const element = document.createElement("div");
        const allergens = ["casein", "nuts"];
        ReactDOM.render(<AllergensCard allergens={allergens} />, element);
    });

    it("should show allergens", () => {
        const element = document.createElement("div");
        const allergens = ["casein", "nuts"];
        ReactDOM.render(<AllergensCard allergens={allergens} />, element);

        expect(element.querySelector("li:nth-of-type(1)").innerHTML).toEqual(
            allergens[0]
        );
        expect(element.querySelector("li:nth-of-type(2)").innerHTML).toEqual(
            allergens[1]
        );
    });

    it("should show error message", async () => {
        const element = document.createElement("div");

        await act(async () => {
            ReactDOM.render(
                <MemoryRouter>
                    <ListPizzas
                        pizzaApi={{
                            listPizzas: () =>
                                new Promise((resolve, reject) => {
                                    reject(new Error("Failed to fetch"));
                                }),
                        }}
                    />
                </MemoryRouter>,
                element
            );
        });

        expect(element.querySelector("#error-list-pizzas-div").innerHTML).toContain(
            "Failed to fetch"
        );
    });
});