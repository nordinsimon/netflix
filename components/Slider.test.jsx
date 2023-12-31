import { test, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { AllContextProvider } from "../src/context/context";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
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

test("Test that movie info appears on hover", async () => {
  customRender();

  // Get the first movie by its alt text
  const movie = screen.getByAltText(testMovies[0].title);

  userEvent.hover(movie);

  await waitFor(() => {
    expect(screen.getByText(testMovies[0].title)).toBeInTheDocument();
  });
});

test("renders correct number of movies", () => {
  customRender();

  const allMovieImages = testMovies.map((movie) => {
    return screen.getByAltText(new RegExp(movie.title, "i"));
  });

  expect(allMovieImages).toHaveLength(testMovies.length);
});

// De andra testerna har jag lyckats konvertera till userEvent istället för fireEvent däremot gick det inte på denna, jag vet inte om det kan vara för att knappen man trycker på är en image och inte en button. Men med fireEvent funkar det // Maximus

test("the first movie moves to the last position after clicking next button", () => {
  customRender();

  const movieTitles = testMovies.map((movie) => movie.title);
  let allMovieImages = screen
    .getAllByRole("img")
    .filter((img) => movieTitles.includes(img.alt));

  // console.log("före click", allMovieImages); for testing purposes the difference between fireEvent and userEvent
  expect(allMovieImages[0]).toHaveAttribute("alt", "12 Angry Men");

  const nextButton = screen.getByRole("img", { name: /nextImage/i });
  fireEvent.click(nextButton);

  allMovieImages = screen
    .getAllByRole("img")
    .filter((img) => movieTitles.includes(img.alt));

  // console.log("efter click", allMovieImages); for testing purposes the difference between fireEvent and userEvent - different arrays?

  expect(allMovieImages[allMovieImages.length - 1]).toHaveAttribute(
    "alt",
    "12 Angry Men",
  );
});

test("checks bookmark icon exist", async () => {
  customRender();
  const user = userEvent.setup();
  const movie = screen.getByAltText(testMovies[0].title);
  await user.hover(movie);
  const bookmarkButton = await screen.findByTestId("bookmarkFilm");
  expect(bookmarkButton).toBeInTheDocument();
  expect(bookmarkButton).toHaveAttribute("stroke", "white");
});
