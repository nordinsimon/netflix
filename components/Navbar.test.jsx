import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllContextProvider } from "../src/context/context";
import Navbar from "./Navbar";

const customRender = () => {
  return render(
    <MemoryRouter>
      <AllContextProvider>
        <Navbar />
      </AllContextProvider>
    </MemoryRouter>,
  );
};

test("that Home-button exist in Navbar", () => {
  customRender();
  const homeBtn = screen.getByText("Home");
  expect(homeBtn).toBeInTheDocument;
});

test("that categories-button exist in Navbar", () => {
  customRender();
  const categoryBtn = screen.getByText("Category");
  expect(categoryBtn).toBeInTheDocument;
});
