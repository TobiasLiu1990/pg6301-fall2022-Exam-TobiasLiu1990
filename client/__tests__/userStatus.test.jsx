import {Login} from "../userStatus";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";


describe("login component", () => {
    it("should show login form", async () => {
        const element = document.createElement("div");
        await act(async () => ReactDOM.render(<Login/>, element));

        expect(element.innerHTML).toMatchSnapshot();
    })
})