import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import Header from "../components/Header";

afterEach(() => {
  cleanup();
});

test("renders header title", () => {
  render(<Header />);
  const titleElement = screen.getByText(/Cool GitHub projects/i);
  expect(titleElement).toBeInTheDocument();
});
