import React from "react";
import ReactDOM from "react-dom";
import { Application } from "../application";

describe("application component", () => {
  it("should render", () => {
    const element = document.createElement("div");
    ReactDOM.render(<Application />, element);

    expect(element.innerHTML).toMatchSnapshot();
  });
});
