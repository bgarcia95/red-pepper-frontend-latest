import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

const Task = (props) => {
  const { combos, dishes, orderNumber, orderType } = props;

  const getDishName = (dId) => {
    if (dId === null) {
      return;
    }

    return dishes.find((dish) => dish.id === dId)?.name;
  };

  const getComboName = (cId) => {
    if (cId === null) {
      return;
    }
    return combos.find((combo) => combo.id === cId)?.name;
  };

  // console.log('orderedDetails', props.order.orderDetails.sort((a,b) => a.id > b.id));
  // console.log('orderedDetails', props.details.sort((a,b) => a.id > b.id));
  // console.log(
  //   "orderedDetails",
  //   props.details
  //     .sort((a, b) => a.id - b.id)
  //     .map((detail) => detail)
  //     .filter((det) => det.status === "En Cola")
  // );
  const detailCommentsArray = props.detail?.comments?.split("\n");
  // console.log('detail', props.detail);

  return (
    props.detail?.status === props.status && (
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
        key={props.detail?.id}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6"> {orderNumber}</Typography>
          <Typography variant="p" style={{ fontWeight: "bold" }}>
            {orderType === 1
              ? "Comer aqui"
              : props.orderType === 2
              ? "Para Llevar"
              : "A domicilio"}
          </Typography>
        </div>
        <p style={{ margin: 0, padding: 0 }}>
          {props.detail?.qty}x{" "}
          {getDishName(props.detail?.dishId) || getComboName(props.detail?.comboId)}
        </p>
        {props.detail?.comments && (
          <Fragment>
            <p style={{ margin: "10px 0" }}>Comentarios:</p>
            {detailCommentsArray.map((comment, index) => (
              <p
                key={index}
                // style={{ padding: "5px 0", margin: "5px 0" }}
                style={{ margin: 0, padding: 0 }}
              >
                - {comment}
              </p>
            ))}
          </Fragment>
        )}
      </div>
    )
  );
};

export default Task;
