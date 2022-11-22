import React from "react";
import ReactDOM from "react-dom";
import {Application} from "../application";
import component from "express";


describe("application component", () => {
    it("should render", () => {
        const element = document.createElement("div");
        ReactDOM.render(<Application/>, element)

        expect(element.innerHTML).toMatchSnapshot();
    })

    it("should navigate ", () => {
        const navigateSpy = jest.spyOn(router, 'navigate');
        component.application();
        expect(navigateSpy).toHaveBeenCalledWith(["/"]);

    })
})