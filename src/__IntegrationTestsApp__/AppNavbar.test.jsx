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

test("that navbar Is Working", async () => {
  await loginTestFunction();

  //Bookmark
  const bookmarkButton = screen.getByTestId("bookmarkButton");
  expect(bookmarkButton).to.exist;
  await userEvent.click(bookmarkButton);
  const bookmarkHeader = screen.getByText("Bookmarked Movies");
  expect(bookmarkHeader).to.exist;

  //Category
  const Category = screen.getByText("Category");
  expect(Category).to.exist;
  await userEvent.click(Category);
  const categoryHeader = screen.getByText("All Movies");
  expect(categoryHeader).to.exist;

  //Home
  const homeButton = screen.getByText("Home");
  expect(homeButton).to.exist;
  await userEvent.click(homeButton);
  const trending = screen.getByText("Trending");
  expect(trending).to.exist;

  //Search
  const searchButton = screen.getByTestId("search");
  expect(searchButton).to.exist;
  await userEvent.click(searchButton);
  const searchInput = screen.getByPlaceholderText("Search for movies");
  expect(searchInput).to.exist;

  const closeSearch = screen.getByRole("button", { name: "Close" });
  expect(closeSearch).to.exist;
  await userEvent.click(closeSearch);

  //Logout
  const logoutButton = screen.getByTestId("logout");
  expect(logoutButton).to.exist;
});
