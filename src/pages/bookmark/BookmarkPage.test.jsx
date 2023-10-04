import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllContextProvider } from "../../context/context";
import BookmarkPage from "./BookmarkPage";

const customRender = () => {
  return render(
    <MemoryRouter>
      <AllContextProvider>
        <BookmarkPage />
      </AllContextProvider>
    </MemoryRouter>,
  );
};

test("that text: Bookmarked Movies, show when page renders", () => {
  customRender();
  expect(screen.getByText("Bookmarked Movies")).to.exist;
});

test("that the text: You have not bookmarked any movies yet, show when the page renders", () => {
  customRender();
  expect(
    screen.getByText("You have not bookmarked any movies yet."),
  ).toBeInTheDocument();
});
