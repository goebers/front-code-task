import { FC } from "react";
import { Card, Space, Button, Typography, Rate } from "antd";
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
          data-testid="remove-button"
        />
      }
    >
      <Space size="large" direction="vertical">
        <Rate
          disabled
          count={rating}
          value={rating}
          character={<StarFilled style={{ stroke: "#000", strokeWidth: 50 }} />}
        />
        <Typography.Paragraph italic mark strong type="secondary">
          Date added: {format(new Date(createdAt), "dd/MM/yyyy")}
        </Typography.Paragraph>
      </Space>
    </Card>
  </a>
);

export default ProjectCard;
