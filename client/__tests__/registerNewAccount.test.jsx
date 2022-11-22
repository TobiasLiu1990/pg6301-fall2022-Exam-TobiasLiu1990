import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import {RegisterNewAccount, RegisterNewAccountForTest} from "../registerNewAccount";
import { act, Simulate } from "react-dom/test-utils";

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

    expect(inputLabels).toEqual(["Username: ", "Full name: ", "Password: "]);
  });

  it("should create new account", async () => {
    const addUser = jest.fn();
    const element = document.createElement("div");

    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <RegisterNewAccountForTest registerApi={{addUser}} />
        </MemoryRouter>,
        element
      )
    );

    Simulate.change(
      element.querySelector("form:nth-of-type(2) div:nth-of-type(1) input"),
      {
        target: { value: "simulated user" },
      }
    );

    Simulate.change(
      element.querySelector("form:nth-of-type(2) div:nth-of-type(2) input"),
      {
        target: { value: "simulated full name" },
      }
    );

    Simulate.change(
      element.querySelector("form:nth-of-type(2) div:nth-of-type(3) input"),
      {
        target: { value: "simulated password" },
      }
    );

    Simulate.submit(element.querySelector("form"));

    expect(addUser).toBeCalledWith({
      username: "simulated user",
      fullName: "simulated full name",
      password: "simulated password",
    });
  });

  it("should go back on back button", async () => {
    const backOnClick = jest.fn();
    const element = document.createElement("div");


    // await act(async () =>
    //     ReactDOM.render(
    //         <MemoryRouter>
    //           <RegisterNewAccount handleClick={backOnClick} />
    //         </MemoryRouter>,
    //         element
    //     )
    // );
    //
    // Simulate.click(element.querySelector("button:nth-of-type(1)"))
    //
    // expect(backOnClick).toBeCalled();



    // const backOnClick = jest.fn();
    // const element = document.createElement("div");
    // const mockButton = ReactDOM.render((<button onClick={backOnClick}>Go Back</button>), element)
    // Simulate.click(element.querySelector("button"))
    // expect(backOnClick.mock.calls.length).toEqual(1)


  })
});
