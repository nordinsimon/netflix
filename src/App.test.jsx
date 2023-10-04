import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import { AllContextProvider } from "./context/context";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

const custumRender = () => {
  return render(
    <AllContextProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AllContextProvider>,
  );
};

test("test that movies show when Slider renders", () => {
  custumRender();
  const movies = screen.getAllByText("");
  expect(movies).to.exist;
});
