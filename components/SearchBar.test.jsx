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

test("input-field and search-button", async () => {
  customRender();
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  const searchBtn = screen.getByRole("button", { name: "Search" });
  const movie = { title: "Gladiator" };

  expect(searchBtn).toBeInTheDocument;
  expect(input).toBeInTheDocument;

  await user.type(input, "Gladiator");
  await user.click(searchBtn);

  expect(movie.title).to.exist; //Ändra
});

test("close-button", async () => {
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
