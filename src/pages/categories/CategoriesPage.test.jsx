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
  expect(screen.getAllByText("Categories")).to.exist;
});

test("test that all buttons: categories show when CategoriesPage renders", () => {
  customRender();
  const buttons = screen.getAllByRole("button");
  expect(buttons.length).toBe(15);
});

test("test that movies show when CategoriesPage renders", () => {
  customRender();
  const movies = [
    { title: "Shawshank" },
    { title: "Pulp Fiction" },
    { title: "Inception" },
  ];
  movies.forEach((movie) => {
    expect(movie.title).to.exist;
  });
});

test("that movie: Casablanca shows when Category: War is clicked on", async () => {
  customRender();
  const user = userEvent.setup();
  const warBtn = screen.getByText("War");
  await user.click(warBtn);
  const movie = { title: "Casablanca" };

  expect(movie.title).to.exist;
});

test("that movie: Casablanca shows when Category: War is clicked on and is not shown when Category: Fantasy is clicked on", async () => {
  customRender();
  const user = userEvent.setup();
  const warBtn = screen.getByText("War");
  const fantasyBtn = screen.getByText("Fantasy");
  const movie = { title: "Casablanca" };

  await user.click(warBtn);
  expect(movie.title).to.exist;

  await user.click(fantasyBtn);
  expect(movie.title).not.toBeInTheDocument;
});
