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

test("that category button exists", async () => {
  await loginTestFunction();
  const category = screen.getByText("Category");
  expect(category).toBeInTheDocument();
});
