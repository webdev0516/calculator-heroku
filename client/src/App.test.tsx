// External Dependencies
import { render } from "@testing-library/react";

// Internal Dependencies
import App from "./App";

describe("<App />", () => {
    it("renders main app without crashing", () => {
        render(<App />);
    });
});