import React from "react";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Add from "../components/Add";
import Project from "../project";

// Disable console warnings and errors frombeing outputted to terminal
beforeEach(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {
    expect(console.warn).toBeCalled();
  });
  jest.spyOn(console, "error").mockImplementation(() => {
    expect(console.error).toBeCalled();
  });
});

afterEach(() => {
  cleanup();
});

test("finds 'add'-component", async () => {
  render(<Add addHandler={(project: Project) => {}} />);

  const addElement = await screen.findByText("Add new project");
  expect(addElement).toBeInTheDocument();
});

test("opens modal", async () => {
  render(<Add addHandler={(project: Project) => {}} />);
  fireEvent.click(await screen.findByText("Add new project"));

  expect(await screen.findByRole("dialog")).toBeVisible();
});

test("form validation all FAIL", async () => {
  render(<Add addHandler={(project: Project) => {}} />);
  fireEvent.click(await screen.findByText("Add new project"));
  fireEvent.click(await screen.findByText("Add"));

  await waitFor(async () =>
    expect(await screen.findAllByRole("alert")).toHaveLength(3)
  );
});

test("form validation with no name", async () => {
  render(<Add addHandler={(project: Project) => {}} />);
  fireEvent.click(await screen.findByText("Add new project"));

  const urlInput = await screen.findByPlaceholderText(
    "https://github.com/goebers/front-code-task"
  );
  const ratingInput = await screen.findAllByRole("radio");

  fireEvent.change(urlInput, {
    target: { value: "https://github.com/django/django" },
  });
  fireEvent.click(ratingInput[0]);

  fireEvent.click(await screen.findByText("Add"));

  await waitFor(async () =>
    expect(await screen.findAllByRole("alert")).toHaveLength(1)
  );
});

test("form validation with no url", async () => {
  render(<Add addHandler={(project: Project) => {}} />);
  fireEvent.click(await screen.findByText("Add new project"));

  const nameInput = screen.getByPlaceholderText("Cool project name");
  const ratingInput = await screen.findAllByRole("radio");

  fireEvent.change(nameInput, { target: { value: "test name" } });
  fireEvent.click(ratingInput[0]);

  fireEvent.click(await screen.findByText("Add"));

  await waitFor(async () =>
    expect(await screen.findAllByRole("alert")).toHaveLength(1)
  );
});

test("form validation with incorrect url (not GitHub)", async () => {
  render(<Add addHandler={(project: Project) => {}} />);
  fireEvent.click(await screen.findByText("Add new project"));

  const nameInput = screen.getByPlaceholderText("Cool project name");
  const urlInput = await screen.findByPlaceholderText(
    "https://github.com/goebers/front-code-task"
  );
  const ratingInput = await screen.findAllByRole("radio");

  fireEvent.change(nameInput, { target: { value: "test name" } });
  fireEvent.change(urlInput, { target: { value: "not real url" } });
  fireEvent.click(ratingInput[0]);

  fireEvent.click(await screen.findByText("Add"));

  await waitFor(async () =>
    expect(await screen.findAllByRole("alert")).toHaveLength(1)
  );
});

test("form validation with no rating", async () => {
  render(<Add addHandler={(project: Project) => {}} />);
  fireEvent.click(await screen.findByText("Add new project"));

  const nameInput = screen.getByPlaceholderText("Cool project name");
  const urlInput = await screen.findByPlaceholderText(
    "https://github.com/goebers/front-code-task"
  );

  fireEvent.change(nameInput, { target: { value: "test name" } });
  fireEvent.change(urlInput, { target: { value: "not real url" } });

  fireEvent.click(await screen.findByText("Add"));

  await waitFor(async () =>
    expect(await screen.findAllByRole("alert")).toHaveLength(1)
  );
});
