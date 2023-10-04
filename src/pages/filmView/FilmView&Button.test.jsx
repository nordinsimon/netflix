import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
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
      <MemoryRouter>
        <AllContextProvider>
          <FilmViewPage />
        </AllContextProvider>
      </MemoryRouter>,
    );
    expect(
      screen.getByText("The Shawshank Redemption (1994)"),
    ).toBeInTheDocument();
    const rating = screen.getByText("R");
    expect(rating).toBeInTheDocument();
    const genre = screen.getByText("Drama");
    expect(genre).toBeInTheDocument();
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
