import { FC } from "react";
import { Select } from "antd";

interface SortProps {
  sortHandler: (sortType: string) => void;
}

const Sort: FC<SortProps> = ({ sortHandler }) => (
  <>
    <Select defaultValue="rating-asc" size="large" onChange={sortHandler}>
      <Select.Option value="rating-asc">Rating (ascending)</Select.Option>
      <Select.Option value="rating-desc">Rating (descending)</Select.Option>
      <Select.Option value="date-asc">Date (ascending)</Select.Option>
      <Select.Option value="date-desc">Date (descending)</Select.Option>
    </Select>
  </>
);

export default Sort;
