import React, { FC } from "react";
import "./card.css";

interface CardProps {
  name: string;
  rating: number;
  url: string;
  id: string;
  created_at: string;
  removeHandler: (id: string) => void;
}

const Card: FC<CardProps> = ({
  name,
  rating,
  url,
  id,
  created_at,
  removeHandler,
}) => (
  <div className="card">
    <div className="remove" onClick={() => removeHandler(id)}>
      X
    </div>
    <a href={url} target="_blank" rel="noreferrer">
      <p>{name}</p>
      <p>{rating}</p>
      <p>{url}</p>
      <p>{id}</p>
      <p>{created_at}</p>
    </a>
  </div>
);

export default Card;
