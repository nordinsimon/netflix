import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AllContextProvider } from "../context/context";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

const custumRender = () => {
  return render(
    <AllContextProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AllContextProvider>,
  );
};

const loginTestFunction = async () => {
  custumRender();
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const button = screen.getByRole("button");
  await userEvent.type(username, "Simon");
  await userEvent.type(password, "123");
  await userEvent.click(button);
};

test("that bookmark page is working", async () => {
  await loginTestFunction();
  const bookmarkButton = screen.getByTestId("bookmarkButton");
  expect(bookmarkButton).to.exist;

  await userEvent.click(bookmarkButton);

  const bookmarkHeader = screen.getByText("Bookmarked Movies");
  expect(bookmarkHeader).to.exist;

  const noMovies = screen.getByText("You have not bookmarked any movies yet.");
  expect(noMovies).to.exist;
});
