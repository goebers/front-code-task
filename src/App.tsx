import React, { FC } from "react";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import defaultProjects from "./projects.json";

const App: FC = () => (
  <div className="app">
    <Header />
    <div className="container card__list">
      {defaultProjects.map((project) => (
        <Card
          key={project.id}
          name={project.name}
          rating={project.rating}
          url={project.url}
          id={project.id}
          created_at={project.created_at}
        />
      ))}
    </div>
  </div>
);

export default App;
