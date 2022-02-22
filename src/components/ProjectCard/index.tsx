import React, { FC } from "react";
import { Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./projectCard.css";

interface ProjectCardProps {
  name: string;
  rating: number;
  url: string;
  id: string;
  created_at: string;
  removeHandler: (id: string) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  rating,
  url,
  id,
  created_at,
  removeHandler,
}) => (
  <a href={url} target="_blank" rel="noreferrer">
    <Card title={name} className="card">
      <p>{rating}</p>
      <p>{url}</p>
      <p>{id}</p>
      <p>{created_at}</p>
      <Button
        danger
        icon={<CloseOutlined />}
        onClick={(event) => {
          event.preventDefault();
          removeHandler(id);
        }}
      >
        Remove
      </Button>
    </Card>
  </a>
);

export default ProjectCard;
