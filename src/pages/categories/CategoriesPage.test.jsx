import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AllContextProvider } from "../../context/context";

import CategoriesPage from "./CategoriesPage";

const customRender = () => {
  return render(
    <MemoryRouter>
      <AllContextProvider>
        <CategoriesPage />
      </AllContextProvider>
    </MemoryRouter>,
  );
};

test("test that heading: Categories show when the CategoriesPage renders", () => {
  customRender();
  expect(screen.getByText("Categories")).toBeInTheDocument();
});

test("test that all buttons: categories show when CategoriesPage renders", () => {
  customRender();
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(15);
});

test("that movie: Casablanca shows when Category: War is clicked on and is not shown when Category: Fantasy is clicked on", async () => {
  customRender();
  const user = userEvent.setup();
  const warBtn = screen.getByText("War");
  const fantasyBtn = screen.getByText("Fantasy");
  const movie = { title: "Casablanca" };

  await user.click(warBtn);
  expect(movie.title).toBeInTheDocument;

  await user.click(fantasyBtn);
  expect(movie.title).not.toBeInTheDocument;
});

test("category icon works when screen is smaller", async () => {
  window.innerWidth = 500;
  render(
    <MemoryRouter>
      <AllContextProvider>
        <CategoriesPage />
      </AllContextProvider>
    </MemoryRouter>,
  );
  const user = userEvent.setup();
  const categoryBtn = screen.getByTestId("showGenres");
  expect(categoryBtn).toBeInTheDocument();
  await user.click(categoryBtn);
  const genre = await screen.findByText("Drama");
  expect(genre).toBeInTheDocument();
});
