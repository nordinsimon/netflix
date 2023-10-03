import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { AllContextProvider } from "../../context/context";
import FilmViewPage from "./FilmViewPage";
import BookmarkButton from "../../../components/BookmarkButton";

const mockMovie = {
  title: "The Shawshank Redemption",
  year: 1994,
  rating: "R",
  actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  genre: "Drama",
  synopsis: "Over the course of several years...",
  thumbnail: "https://m.media-amazon.com/images/M/...",
};

describe("FilmViewPage Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    // Mock localStorage for activeMovie
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(() => JSON.stringify(mockMovie)),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it("it renders correctly with given movie", () => {
    render(
      <Router>
        <AllContextProvider>
          <FilmViewPage />
        </AllContextProvider>
      </Router>,
    );
    console.log(screen.debug());
    expect(
      screen.getByText("The Shawshank Redemption (1994)"),
    ).toBeInTheDocument();
    const ratingElement = screen.getByText(/Rating:/).closest("p");
    expect(within(ratingElement).getByText("R")).toBeInTheDocument();
    const genreElement = screen.getByText(/Genre:/).closest("p");
    expect(within(genreElement).getByText("Drama")).toBeInTheDocument();
    expect(
      screen.getByText("Over the course of several years..."),
    ).toBeInTheDocument();
  });
});

describe("BookmarkButton Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    // Mock localStorage for bookmarks
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(() => JSON.stringify([])), // initially empty bookmarks
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it("it toggles bookmark status on click", () => {
    render(
      <AllContextProvider>
        <BookmarkButton movie={mockMovie} />
      </AllContextProvider>,
    );

    const button = screen.getByRole("button", { name: /Bookmark/ });
    fireEvent.click(button);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "bookmarks",
      JSON.stringify([mockMovie]),
    );
  });

  // ... other tests ...
});
