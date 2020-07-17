import React from "react";
import Card from "./Card";

const CardList = ({ robots }) => {
  return (
    <div>
      {robots.map((robot, key) => {
        return <Card key={key} robot={robot} />;
      })}
    </div>
  );
};

export default CardList;
