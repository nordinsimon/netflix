/*import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AllContextProvider } from "../../context/context";

// import App from "../../../App.jsx";
import CategoriesPage from "./CategoriesPage";

test("test that categories show when the CategoriesPage renders", () => {
  render(<CategoriesPage />);
  expect(screen.getByText("Categories")).to.exist;
});

test("test that all categories show when CategoriesPage renders", () => {
  render(<CategoriesPage />);
  expect(
    screen.findAllByText(
      "Drama",
      "Crime",
      "Action",
      "Biography",
      "History",
      "Adventure",
      "Western",
      "Romance",
      "Sci-Fi",
      "Fantasy",
      "Thriller",
      "War",
      "Mystery",
      "Music",
      "Horror",
      "lsdkllö" //varför?
    )
  ).to.exist;
});

test("test that movies show when CategoriesPage renders", () => {
  render(
    <AllContextProvider>
      <CategoriesPage />
    </AllContextProvider>
  );
  const movies = [
    { title: "Shawshank" },
    { title: "Pulp Fiction" },
    { title: "Inception" },
    { title: "frogman" }, // Varför?
  ];
  movies.forEach((movie) => {
    expect(movie.title).toBeInTheDocument();
  });
});

test("that movie: Casablanca shows when Category: War is clicked on", async () => {
  render(
    <AllContextProvider>
      <CategoriesPage />
    </AllContextProvider>
  );
  const user = userEvent.setup();
  const warBtn = screen.getByText("War");
  await user.click(warBtn);
  const movie = { title: "Casablanca" };

  expect(movie.title).toBeInTheDocument();
});*/
