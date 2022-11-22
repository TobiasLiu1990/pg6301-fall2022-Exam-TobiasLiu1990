import ReactDOM from "react-dom";
import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { Login, LoginForTest } from "../login";
import { queryAllByAltText } from "@testing-library/react";

const user = [
  {
    role: "admin",
    username: "administrator",
    fullName: "mr. admin",
    password: "secret",
  },
];

describe("login component", () => {
  it("should show login form", async () => {
    const element = document.createElement("div");
    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>,
        element
      )
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should simulate login form", async () => {
    const fakeLogin = jest.fn();
    const element = document.createElement("div");

    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <LoginForTest loginApi={{ fakeLogin }} />
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
        target: { value: "password" },
      }
    );

    Simulate.submit(element.querySelector("form"));

    expect(fakeLogin).toBeCalledWith({
      username: "admin",
      password: "password",
    });
  });
});
