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

test("that bookmark page is working", async () => {
  await loginTestFunction();
  const bookmarkButton = screen.getByTestId("bookmarkButton");
  expect(bookmarkButton).toBeInTheDocument();

  await userEvent.click(bookmarkButton);
  const bookmarkHeader = screen.getByText("Bookmarked Movies");
  expect(bookmarkHeader).toBeInTheDocument();
  const noMovies = screen.getByText("You have not bookmarked any movies yet.");
  expect(noMovies).toBeInTheDocument();

  const homeButton = screen.getByText("Home");
  await userEvent.click(homeButton);
  const movies = screen.getAllByRole("img", { name: "Movie 0" });
  const movie0 = movies[0];
  expect(movie0).toBeInTheDocument();

  await userEvent.click(movie0);
  const movieHeader = screen.getByText("The Godfather: Part II");
  expect(movieHeader).toBeInTheDocument();

  const bookmarkFilm = screen.getByRole("button", { name: "Bookmark" });
  await userEvent.click(bookmarkFilm);

  await userEvent.click(bookmarkButton);
  const bookmarkedMovie = screen.getByText("The Godfather: Part II");
  expect(bookmarkedMovie).toBeInTheDocument();
  expect(noMovies).not.toBeInTheDocument();

  /*
  await userEvent.hover(movie0);
  const bookmark = a screen.getByTestId("bookmarkFilm");

  await userEvent.click(bookmark);
  await userEvent.unhover(movie0);

  expect(noMovies).toBeInTheDocument();

    await userEvent.hover(movie0);
  const bookmark = screen.getByTestId("bookmarkFilm");

  await userEvent.click(bookmark);
  await userEvent.unhover(movie0);

  await userEvent.click(bookmarkButton);
  await waitFor(() => {
    expect(bookmarkHeader).toBeInTheDocument();
  }); */
});
