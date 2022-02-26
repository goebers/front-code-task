import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import Sort from "../components/Sort";

afterEach(() => {
  cleanup();
});

test("finds 'sort'-component", async () => {
  render(<Sort sortHandler={(val) => {}} />);

  const sortElement = await screen.findByText("Rating (ascending)");
  expect(sortElement).toBeInTheDocument();
});

test("changes select component and returns correct value", async () => {
  let newVal: string = "";
  const onChangeHandler = jest.fn((val: string) => (newVal = val));
  render(<Sort sortHandler={onChangeHandler} />);

  fireEvent.mouseDown(await screen.findByText("Rating (ascending)"));
  fireEvent.click(await screen.findByText("Date (descending)"));
  expect(onChangeHandler).toBeCalled();
  expect(newVal).toBe("date-desc");
});
