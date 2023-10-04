import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LoginPage from "./LoginPage";
import { expect, test } from "vitest";

const custumRender = () => {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );
};

test("Check if there is a Login Page", () => {
  custumRender();
  const header = screen.getByText("Netflix Login");
  expect(header).toBeInTheDocument();
});

test("Check if there is a input for username", () => {
  custumRender();
  const input = screen.getByPlaceholderText("Username");
  expect(input).toBeInTheDocument();
});

test("Check if there is a input for password", () => {
  custumRender();
  const input = screen.getByPlaceholderText("Password");
  expect(input).toBeInTheDocument();
});

test("Check if there is a button to Login", () => {
  custumRender();
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});