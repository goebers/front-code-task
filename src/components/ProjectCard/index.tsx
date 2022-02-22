import React, { FC } from "react";
import { Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./projectCard.css";

interface ProjectCardProps {
  name: string;
  rating: number;
  url: string;
  id: string;
  createdAt: string;
  bgColor: string;
  removeHandler: (id: string) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  rating,
  url,
  id,
  createdAt,
  bgColor,
  removeHandler,
}) => (
  <a href={url} target="_blank" rel="noreferrer">
    <Card title={name} className="card" style={{ backgroundColor: bgColor }}>
      <p>{rating}</p>
      <p>{url}</p>
      <p>{id}</p>
      <p>{createdAt}</p>
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
