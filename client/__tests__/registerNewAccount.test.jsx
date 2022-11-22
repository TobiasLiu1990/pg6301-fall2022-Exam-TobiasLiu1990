import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { RegisterNewAccount } from "../registerNewAccount";
import { act } from "react-dom/test-utils";

describe("register new account component", () => {
  it("should show register form", async () => {
    const element = document.createElement("div");

    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <RegisterNewAccount />
        </MemoryRouter>,
        element
      )
    );

    expect(element.innerHTML).toMatchSnapshot();

    const inputLabels = Array.from(
        element.querySelectorAll("form label strong")
    ).map((label) => label.innerHTML);

    expect(inputLabels).toEqual([
        "Username: ",
        "Full name: ",
        "Password: "
    ]);
  });

  it("should create new account", async () => {
      //Mock
      const addUser = jest.fn();
      const element = document.createElement("div");


  })



});
