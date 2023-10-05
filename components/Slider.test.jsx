import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AllContextProvider } from "../src/context/context";
import { MemoryRouter } from "react-router-dom";

import Slider from "./Slider";

const testMovies = [
  {
    title: "12 Angry Men",
    year: 1957,
    rating: "Not Rated",
    actors: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"],
    genre: "Crime, Drama",
    synopsis:
      "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
  },
  {
    title: "Schindler's List",
    year: 1993,
    rating: "R",
    actors: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    genre: "Biography, Drama, History",
    synopsis:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    rating: "PG-13",
    actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
    genre: "Action, Adventure, Drama",
    synopsis:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
    isTrending: true,
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    rating: "R",
    actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    genre: "Crime, Drama",
    synopsis:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
  },
  {
    title: "The Good, the Bad and the Ugly",
    year: 1966,
    rating: "Not Rated",
    actors: ["Clint Eastwood", "Lee Van Cleef", "Eli Wallach"],
    genre: "Western",
    synopsis:
      "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
  },
];

const customRender = () => {
  return render(
    <AllContextProvider>
      <MemoryRouter>
        <Slider filmsToMap={testMovies} />
      </MemoryRouter>
    </AllContextProvider>,
  );
};

test("test that movies show when Slider renders", () => {
  customRender();
  const movies = screen.getAllByRole("img");
  expect(movies).to.exist;
});

test.skip("Test that movie info appears on hover", async () => {
  // KOlla längden på arrayen
  customRender();

  const allMovieImages = screen.getAllByRole("img");
  const movie = allMovieImages[0]; // gets the first movie image

  fireEvent.mouseOver(movie); //USER EVENT

  const movieInfo = await screen.findByText(testMovies[0].title);
  expect(movieInfo).toBeInTheDocument();
});
