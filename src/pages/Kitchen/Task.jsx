import React from "react";
import { Typography } from "@material-ui/core";

const Task = (props) => {
  const { combos, dishes } = props;

  const getDishName = (dId) => {
    if (dId === null) {
      return;
    }

    return dishes.find((dish) => dish.id === dId).name;
  };

  const getComboName = (cId) => {
    if (cId === null) {
      return;
    }
    return combos.find((combo) => combo.id === cId).name;
  };
  return props.task.orderDetails.map(
    (detail, index) =>
      detail.status === props.status && (
        <div
          style={{
            border: " 1px solid lightgrey",
            borderRadius: "2px",
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "white",

            display: "flex",
            flexDirection: "column",
          }}
          key={index}
        >
          <Typography variant="h6"> {props.task.orderNumber}</Typography>
          <p>
            {detail.qty}x{" "}
            {getDishName(detail.dishId) || getComboName(detail.comboId)}
          </p>
        </div>
      )
  );
};

export default Task;
