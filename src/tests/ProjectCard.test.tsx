import React from "react";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import ProjectCard from "../components/ProjectCard";

afterEach(() => {
  cleanup();
});

test("finds 'ProjectCard'-component", async () => {
  render(
    <ProjectCard
      name={"Test project"}
      rating={0}
      url={""}
      id={""}
      createdAt={new Date().toISOString()}
      bgColor={""}
      removeHandler={(id: string) => {}}
    />
  );

  const projectCardName = await screen.findByText("Test project");
  expect(projectCardName).toBeInTheDocument();
});

test("deletes project card", async () => {
  let removeId: string = "";
  const onRemoveHandler = jest.fn((id: string) => (removeId = id));
  render(
    <ProjectCard
      name={"Test project"}
      rating={0}
      url={""}
      id={"test-id"}
      createdAt={new Date().toISOString()}
      bgColor={""}
      removeHandler={onRemoveHandler}
    />
  );

  fireEvent.click(await screen.findByTestId("remove-button"));
  await waitFor(async () => expect(removeId).toBe("test-id"));
});

test("should navigate to set url when clicked", async () => {
  render(
    <ProjectCard
      name={"Test project"}
      rating={0}
      url={"https://github.com/goebers/front-code-task"}
      id={"test-id"}
      createdAt={new Date().toISOString()}
      bgColor={""}
      removeHandler={(id: string) => {}}
    />
  );

  const linkElement = await screen.findByRole("link");
  expect(linkElement).toHaveAttribute(
    "href",
    "https://github.com/goebers/front-code-task"
  );
});
