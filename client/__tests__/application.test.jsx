import React from "react";
import ReactDOM from "react-dom";
import {Application} from "../application";


describe("index render", () => {
    it("should render", () => {
        const element = document.createElement("div");
        ReactDOM.render(<Application/>, element)

        expect(element.innerHTML).toMatchSnapshot();
    })

    it("should go to / (frontpage)", () => {
        const wrapper = mount
    })

})