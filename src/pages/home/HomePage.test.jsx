import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
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

test("HomePage renders without crashing", () => {
  customRender();
  expect(screen.getByTestId("homepage")).toBeTruthy(); //Ta bort test ID
});

test("Navbar component is rendered in HomePage", () => {
  // Ta bort test id
  customRender();
  expect(screen.getByTestId("nav")).toBeInTheDocument();
});

test("Trending component is rendered in HomePage", () => {
  customRender();
  expect(screen.getByText("Trending")).toBeInTheDocument();
});

test("Recommended component is rendered in HomePage", () => {
  customRender();
  expect(screen.getByText("Recommended")).toBeInTheDocument();
});

// test that the "Recommended" section of  HomePage is correctly displaying movies
const mockMovies = [
  { id: 1, title: "Movie 1", recommended: true },
  { id: 2, title: "Movie 2", recommended: true },
];

const MockedAllContextProvider = ({ children }) => (
  <AllContextProvider value={{ movies: mockMovies }}>
    {children}
  </AllContextProvider>
);

test("Recommended movies are displayed", () => {
  render(
    <MemoryRouter>
      <MockedAllContextProvider>
        <HomePage />
      </MockedAllContextProvider>
    </MemoryRouter>,
  );
  // Get the "Recommended" section container
  const recommendedSection = screen.getByTestId("recommended-section");

  // Assertions
  mockMovies.forEach((movie) => {
    expect(
      within(recommendedSection).getByAltText(movie.title),
    ).toBeInTheDocument();
  });
});

//testing if trending movies are rendered in "trending" section
test("Trending movies are displayed", () => {
  render(
    <MemoryRouter>
      <MockedAllContextProvider>
        <HomePage />
      </MockedAllContextProvider>
    </MemoryRouter>,
  );

  //Get the Trending section container
  const trendingSection = screen.getByTestId("trending-section");
  mockMovies.forEach((movie) => {
    expect(
      within(trendingSection).getByAltText(movie.title),
    ).toBeInTheDocument();
  });
});
