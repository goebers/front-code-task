import React from "react";
import ReactDOM from "react-dom";
import { cleanup, render, screen } from "@testing-library/react";
import App from "../App";

afterEach(() => {
  cleanup();
});

test("contains project cards", async () => {
  render(<App />);
  const projectsWrapper = screen.queryAllByTestId("project-card");

  expect(projectsWrapper).toBeDefined();
});
