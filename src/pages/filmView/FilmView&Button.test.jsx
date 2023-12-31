import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, vi, test } from "vitest";
import userEvent from "@testing-library/user-event";
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

  test(" renders correctly with given movie", () => {
    render(
      <MemoryRouter>
        <AllContextProvider>
          <FilmViewPage />
        </AllContextProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    expect(screen.getByText("R")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
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

  test("it toggles bookmark status on click", async () => {
    render(
      <AllContextProvider>
        <BookmarkButton movie={mockMovie} />
      </AllContextProvider>,
    );

    const button = screen.getByRole("button", { name: /Bookmark/ });
    localStorage.setItem.mockClear();
    userEvent.click(button);
    await waitFor(() => {
      expect(localStorage.setItem.mock.calls[0]).toEqual([
        "bookmarks",
        JSON.stringify([mockMovie]),
      ]);
    });
  });
});
