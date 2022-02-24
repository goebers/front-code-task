import { FC, useState, useEffect, useMemo } from "react";
import { Row, Col, Empty, Typography, Divider } from "antd";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import Add from "./components/Add";
import Sort from "./components/Sort";
import defaultProjects from "./projects.json";
import Project from "./project";
import "./App.css";

const App: FC = () => {
  const initialProjects =
    localStorage.getItem("projects") !== null
      ? (JSON.parse(localStorage.getItem("projects") || "") as Project[])
      : defaultProjects;

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [sortType, setSortType] = useState<string>("rating-asc");

  const bgColors = [
    "#789395",
    "#94B49F",
    "#B4CFB0",
    "#E5E3C9",
    "#9AD0EC",
    "#EFDAD7",
    "#E3BEC6",
    "#EAEAEA",
    "#F9F9F9",
    "#FBF7F0",
  ];

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

  return (
    <div>
      <Header />
      <Row style={{ margin: "2rem 0", alignItems: "flex-end" }}>
        <Col xs={24} lg={12}>
          <Add
            addHandler={(newProject) =>
              setProjects((projects) => [...projects, newProject])
            }
          />
        </Col>
        <Col xs={24} lg={12}>
          <Sort sortHandler={(sortVal: string) => setSortType(sortVal)} />
        </Col>
      </Row>
      <Divider />
      <TransitionGroup>
        <Row gutter={[16, 16]}>
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <CSSTransition
                key={project.id}
                in
                appear
                timeout={300}
                classNames="fade"
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
                  />
                </Col>
              </CSSTransition>
            ))
          ) : (
            <CSSTransition in appear timeout={300} classNames="fade">
              <Col flex={1}>
                <Empty
                  description={
                    <Typography.Text strong>
                      No projects? Try adding some..
                    </Typography.Text>
                  }
                />
              </Col>
            </CSSTransition>
          )}
        </Row>
      </TransitionGroup>
    </div>
  );
};

export default App;
