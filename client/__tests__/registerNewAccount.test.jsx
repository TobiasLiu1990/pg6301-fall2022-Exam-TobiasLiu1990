import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

import { act, Simulate } from "react-dom/test-utils";
import {
  RegisterNewAccount,
  RegisterNewAccountForTest,
} from "../registerNewAccount";

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
      "Role: ",
      "Username: ",
      "Full name: ",
      "Password: ",
    ]);
  });

  it("should create new account", async () => {
    const addUser = jest.fn();
    const element = document.createElement("div");

    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <RegisterNewAccountForTest registerApi={{ addUser }} />
        </MemoryRouter>,
        element
      )
    );

    Simulate.change(
      element.querySelector("form:nth-of-type(2) div:nth-of-type(1) input"),
      {
        target: { value: "admin" },
      }
    );

    Simulate.change(
      element.querySelector("form:nth-of-type(2) div:nth-of-type(2) input"),
      {
        target: { value: "simulated user" },
      }
    );

    Simulate.change(
      element.querySelector("form:nth-of-type(2) div:nth-of-type(3) input"),
      {
        target: { value: "simulated full name" },
      }
    );

    Simulate.change(
      element.querySelector("form:nth-of-type(2) div:nth-of-type(4) input"),
      {
        target: { value: "simulated password" },
      }
    );

    Simulate.submit(element.querySelector("form"));

    expect(addUser).toBeCalledWith({
      role: "admin",
      username: "simulated user",
      fullName: "simulated full name",
      password: "simulated password",
    });
  });
});
