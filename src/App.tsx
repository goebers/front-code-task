import { FC, useState, useEffect } from "react";
import { Row, Col } from "antd";
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

  const [projects, setProjects] = useState(initialProjects);

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

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <div>
      <Header />
      <Row>
        <Col xs={24} lg={12}>
          <Add
            addHandler={(newProject) =>
              setProjects((projects) => [...projects, newProject])
            }
          />
        </Col>
        <Col xs={24} lg={12}>
          <Filter />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {projects.map((project) => (
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
        ))}
      </Row>
    </div>
  );
};

export default App;
