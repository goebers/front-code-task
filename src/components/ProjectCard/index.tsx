import React, { FC } from "react";
import { Card, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";

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
    <Card
      hoverable
      title={name}
      style={{ backgroundColor: bgColor }}
      headStyle={{ fontWeight: 700 }}
      extra={
        <Button
          danger
          type="primary"
          icon={<DeleteFilled />}
          onClick={(event) => {
            event.preventDefault();
            removeHandler(id);
          }}
        />
      }
    >
      <p>{rating}</p>
      <p>{url}</p>
      <p>{id}</p>
      <p>{createdAt}</p>
    </Card>
  </a>
);

export default ProjectCard;
