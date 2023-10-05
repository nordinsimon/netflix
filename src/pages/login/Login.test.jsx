import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllContextProvider } from "../../context/context";
import LoginPage from "./LoginPage";
import { expect, test } from "vitest";

const custumRender = () => {
  return render(
    <MemoryRouter>
      <AllContextProvider>
        <LoginPage />
      </AllContextProvider>
    </MemoryRouter>,
  );
};

test("that there is a Login Page", () => {
  custumRender();
  const header = screen.getByText("Welcome back!");
  expect(header).toBeInTheDocument();
});

test("that there is an input for username", () => {
  custumRender();
  const input = screen.getByPlaceholderText("Username");
  expect(input).toBeInTheDocument();
});

test("that there is an input for password", () => {
  custumRender();
  const input = screen.getByPlaceholderText("Password");
  expect(input).toBeInTheDocument();
});

test("that there is a Login button", () => {
  custumRender();
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
