import { FC, useState, useEffect } from "react";
import { Row, Col, Empty, Typography, Divider } from "antd";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import Add from "./components/Add";
import Filter from "./components/Sort";
import defaultProjects from "./projects.json";
import Project from "./project";

const App: FC = () => {
  const initialProjects =
    localStorage.getItem("projects") !== null
      ? (JSON.parse(localStorage.getItem("projects") || "") as Project[])
      : defaultProjects;

  const [projects, setProjects] = useState<Project[]>(initialProjects);

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

  const sortProjects = (sortType: string) => {
    // TODO: make this nicer?
    if (sortType === "date-asc") {
      setProjects(
        projects
          .slice()
          .sort(
            (a, b) =>
              new Date(a.created_at).valueOf() -
              new Date(b.created_at).valueOf()
          )
      );
    } else if (sortType === "date-desc") {
      setProjects(
        projects
          .slice()
          .sort(
            (a, b) =>
              new Date(b.created_at).valueOf() -
              new Date(a.created_at).valueOf()
          )
      );
    } else if (sortType === "rating-asc") {
      setProjects(projects.slice().sort((a, b) => a.rating - b.rating));
    } else if (sortType === "rating-desc") {
      setProjects(projects.slice().sort((a, b) => b.rating - a.rating));
    }
  };

  // Initial page load hook
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => sortProjects("rating-asc"), []);

  // Hook for when projects changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

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
          <Filter sortHandler={(sortVal) => sortProjects(sortVal)} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Col key={project.id} xs={24} md={12} lg={6}>
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
          ))
        ) : (
          <Col flex={1}>
            <Empty
              description={
                <Typography.Text strong>
                  No projects? Try adding some..
                </Typography.Text>
              }
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default App;
