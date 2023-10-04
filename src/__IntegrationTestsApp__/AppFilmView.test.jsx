import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AllContextProvider } from "../context/context";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

const custumRender = () => {
  return render(
    <AllContextProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AllContextProvider>,
  );
};

const loginTestFunction = async () => {
  custumRender();
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const button = screen.getByRole("button");
  await userEvent.type(username, "Simon");
  await userEvent.type(password, "123");
  await userEvent.click(button);
};

test("that filmViewPage is working", async () => {
  await loginTestFunction();

  const searchOpen = screen.getByTestId("search");
  await userEvent.click(searchOpen);

  const searchInput = screen.getByPlaceholderText("Search for movies");
  await userEvent.type(searchInput, "Lord");
  const searchButton = screen.getByRole("button", { name: "Search" });
  await userEvent.click(searchButton);
  const movieHeader = screen.getByText(
    "The Lord of the Rings: The Return of the King",
  );
  expect(movieHeader).toBeInTheDocument();

  const bookmarkButton = screen.getByRole("button", { name: "Bookmark" });
  await userEvent.click(bookmarkButton);
  const bookmarkedButton = screen.getByRole("button", {
    name: "Unbookmark",
  });
  expect(bookmarkedButton).toBeInTheDocument();

  const homeButton = screen.getByText("Home");
  await userEvent.click(homeButton);
  const movies = screen.getAllByRole("img", { name: "Movie 0" });
  const movie0 = movies[0];
  expect(movie0).toBeInTheDocument();
  await userEvent.click(movie0);

  const movieHeader2 = screen.getByText("The Godfather: Part II");
  expect(movieHeader2).toBeInTheDocument();
});
