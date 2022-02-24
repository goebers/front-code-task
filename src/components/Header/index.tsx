import { FC } from "react";
import { Typography } from "antd";

const Header: FC<React.RefAttributes<HTMLDivElement>> = () => (
  <header>
    <Typography.Title>List of cool GitHub projects</Typography.Title>
  </header>
);

export default Header;
