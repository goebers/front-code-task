import { FC } from "react";
import { Card, Button, Typography } from "antd";
import { DeleteFilled, StarFilled } from "@ant-design/icons";
import { format } from "date-fns";

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
          size="large"
          type="primary"
          icon={<DeleteFilled />}
          onClick={(event) => {
            event.preventDefault();
            removeHandler(id);
          }}
        />
      }
    >
      <Typography.Paragraph>
        {[...Array(5)].map((val, index) => {
          return (
            index < rating && (
              <StarFilled
                style={{
                  color: "#FFE162",
                  fontSize: "1.5rem",
                  stroke: "#000",
                  strokeWidth: 50,
                  marginRight: "5px",
                }}
              />
            )
          );
        })}
      </Typography.Paragraph>
      <Typography.Paragraph italic mark type="secondary">
        Date added: {format(new Date(createdAt), "dd/MM/yyyy")}
      </Typography.Paragraph>
    </Card>
  </a>
);

export default ProjectCard;
