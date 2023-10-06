import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AllContextProvider } from "../src/context/context";
import SearchBar from "./SearchBar";

const mockSetSearching = (input) => {
  let value = input;
  return value;
};

const customRender = () => {
  return render(
    <MemoryRouter>
      <AllContextProvider>
        <SearchBar setSearching={mockSetSearching} />
      </AllContextProvider>
    </MemoryRouter>,
  );
};

test("that input-field and search-button exist in the SearchBar and that it is possible to type: Gladiator in the input-field", async () => {
  customRender();
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  const searchBtn = screen.getByTestId("search");
  const movie = { title: "Gladiator" };

  expect(searchBtn).toBeInTheDocument;
  expect(input).toBeInTheDocument;

  await user.type(input, "Gladiator");
  await user.click(searchBtn);

  expect(movie.title).toBeInTheDocument;
});

test("that close-button exist and operates in the SearchBar", async () => {
  customRender();
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  const closeBtn = screen.getByText("X");

  expect(input).toBeInTheDocument;
  expect(closeBtn).toBeInTheDocument;

  await user.type(input, "bla");
  await user.click(closeBtn);
  expect(input).not.toBeInTheDocument;
});
