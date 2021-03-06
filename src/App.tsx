import { FC, useState, useEffect, useMemo } from "react";
import { Row, Col, Empty, Typography, Divider } from "antd";
import { Flipper, Flipped } from "react-flip-toolkit";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import Add from "./components/Add";
import Sort from "./components/Sort";
import defaultProjects from "./defaultProjects.json";
import bgColors from "./bgColors.json";
import Project from "./project";
import "./App.css";
import anime from "animejs";

const App: FC = () => {
  const initialProjects =
    localStorage.getItem("projects") !== null
      ? (JSON.parse(localStorage.getItem("projects") || "") as Project[])
      : defaultProjects;

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [sortType, setSortType] = useState<string>("rating-asc");

  const getRandomBgColor = (): string => {
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  };

  const sortedProjects = useMemo(() => {
    if (sortType === "date-asc") {
      return [...projects]
        .slice()
        .sort(
          (a, b) =>
            new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()
        );
    } else if (sortType === "date-desc") {
      return [...projects]
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        );
    } else if (sortType === "rating-asc") {
      return [...projects].slice().sort((a, b) => a.rating - b.rating);
    } else if (sortType === "rating-desc") {
      return [...projects].slice().sort((a, b) => b.rating - a.rating);
    }

    return [];
  }, [sortType, projects]);

  // Hook for when projects state changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(sortedProjects));
  }, [sortedProjects]);

  // Animate element appearing
  const onProjectAppear = (element: HTMLElement, index: number) => {
    anime({
      targets: element,
      opacity: 1,
      translateY: 0,
      duration: 300,
      endDelay: index * 15,
      easing: "linear",
    });
  };

  // Animate element disappearing
  const onProjectDisappear = (
    element: HTMLElement,
    index: number,
    onComplete: () => void
  ) => {
    anime({
      targets: element,
      opacity: 0,
      translateY: -15,
      duration: 300,
      delay: index * 5,
      easing: "linear",
      complete: onComplete,
    });
  };

  return (
    <div>
      <Header />
      <Row gutter={[0, 32]}>
        <Col xs={24} lg={12}>
          <Add
            addHandler={(newProject) =>
              setProjects((projects) => [...projects, newProject])
            }
          />
        </Col>
        <Col xs={24} lg={12} className="sort-wrapper">
          <Sort sortHandler={(sortVal: string) => setSortType(sortVal)} />
        </Col>
      </Row>
      <Divider />
      <Flipper flipKey={sortedProjects}>
        <Row gutter={[16, 16]}>
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project, index) => (
              <Flipped
                key={project.id}
                flipId={project.id}
                stagger
                onAppear={onProjectAppear}
                onExit={onProjectDisappear}
              >
                <Col xs={24} md={12} lg={6}>
                  <ProjectCard
                    name={project.name}
                    rating={project.rating}
                    url={project.url}
                    id={project.id}
                    createdAt={project.created_at}
                    bgColor={getRandomBgColor()}
                    removeHandler={(id) =>
                      setProjects(projects.filter((p) => p.id !== id))
                    }
                    data-testid="project-card"
                  />
                </Col>
              </Flipped>
            ))
          ) : (
            <Flipped flipId={sortedProjects.length}>
              <Col flex={1}>
                <Empty
                  description={
                    <Typography.Text strong>
                      No projects? Try adding some..
                    </Typography.Text>
                  }
                />
              </Col>
            </Flipped>
          )}
        </Row>
      </Flipper>
    </div>
  );
};

export default App;
