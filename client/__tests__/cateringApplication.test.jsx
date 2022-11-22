import * as React from "react";
import ReactDOM from "react-dom";
import { CateringApplication, ShowMenu } from "../cateringApplication";
import { MemoryRouter } from "react-router-dom";

describe("cateringApplication render", () => {
  it("should show Links", () => {
    const userAdmin = "admin";
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <ShowMenu user={userAdmin} />
      </MemoryRouter>,
      element
    );

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show Routes", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <CateringApplication />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
