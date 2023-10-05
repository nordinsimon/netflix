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
  const header = screen.getByText("Welcome back!");
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const button = screen.getByRole("button");

  expect(header).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();

  await userEvent.type(username, "Simon");
  await userEvent.type(password, "123");
  await userEvent.click(button);
};

test("that error massage is working when typing wrong username or password", async () => {
  custumRender();
  const header = screen.getByText("Welcome back!");
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const button = screen.getByRole("button");

  expect(header).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();

  await userEvent.type(username, "Fel");
  await userEvent.type(password, "321");
  await userEvent.click(button);

  const error = screen.getByText("Wrong username or password");
  expect(error).toBeInTheDocument();
});

test("that it is possible to login", async () => {
  await loginTestFunction();
  const trending = screen.getByText("Trending");
  const recommended = screen.getByText("Recommended");
  expect(trending).toBeInTheDocument();
  expect(recommended).toBeInTheDocument();
});
