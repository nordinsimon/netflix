import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AllContextProvider } from "../context/context";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

const customRender = () => {
  return render(
    <AllContextProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AllContextProvider>,
  );
};

const loginTestFunction = async () => {
  customRender();
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const button = screen.getByRole("button");
  await userEvent.type(username, "Björn");
  await userEvent.type(password, "123");
  await userEvent.click(button);
};

test.skip("that category button exists, takes you to CategoryPage. When Category: drama is clicked on text: Movies in Drama and first movie-img renders.", async () => {
  await loginTestFunction();
  const category = screen.getByText("Category");

  expect(category).toBeInTheDocument;

  await userEvent.click(category);
  const allMovies = screen.getByText("All Movies");
  expect(allMovies).toBeInTheDocument();

  const dramaBtn = screen.getByRole("button", { name: "Drama" });
  await userEvent.click(dramaBtn);
  const dramaMovies = screen.getByText("Movies in Drama");
  expect(dramaMovies).toBeInTheDocument();
  const movie = screen.getByRole("img", { name: "The Shawshank Redemption" });
  expect(movie).toBeInTheDocument();
});
