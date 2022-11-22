import * as React from "react";
import ReactDOM from "react-dom";
import {LoginLinks, LogoutButton} from "../userStatus";
import { MemoryRouter } from "react-router-dom";

describe("userStatus components", () => {
  it("should render LoginLinks", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <LoginLinks />
      </MemoryRouter>,
      element
    );

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should render LogoutButton", () => {
    const element = document.createElement("div");
    ReactDOM.render(<LogoutButton/>, element);

    expect(element.innerHTML).toMatchSnapshot();
  })
});