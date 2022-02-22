import React, { FC, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import defaultProjects from "./projects.json";

const App: FC = () => {
  const [projects, setProjects] = useState(defaultProjects);

  return (
    <div className="app">
      <Header />
      <div className="container card__list">
        {projects.map((project) => (
          <Card
            key={project.id}
            name={project.name}
            rating={project.rating}
            url={project.url}
            id={project.id}
            created_at={project.created_at}
            removeHandler={(id) =>
              setProjects(projects.filter((p) => p.id !== id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default App;
