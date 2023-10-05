import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { AllContextProvider } from "../../context/context";
import { MemoryRouter } from "react-router-dom";

import HomePage from "./HomePage";

const customRender = () => {
  return render(
    <AllContextProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </AllContextProvider>,
  );
};

test("Trending component is rendered in HomePage", () => {
  customRender();
  expect(screen.getByText("Trending")).toBeInTheDocument();
});

test("Recommended component is rendered in HomePage", () => {
  customRender();
  expect(screen.getByText("Recommended")).toBeInTheDocument();
});
