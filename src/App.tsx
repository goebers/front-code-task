import React, { FC, useState } from "react";
import { Row, Col } from "antd";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import defaultProjects from "./projects.json";
import "./App.css";

const App: FC = () => {
  const [projects, setProjects] = useState(defaultProjects);

  return (
    <div className="app container">
      <Header />
      <Row gutter={[16, 16]}>
        {projects.map((project) => (
          <Col key={project.id} xs={24} md={12} lg={6}>
            <ProjectCard
              name={project.name}
              rating={project.rating}
              url={project.url}
              id={project.id}
              created_at={project.created_at}
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
