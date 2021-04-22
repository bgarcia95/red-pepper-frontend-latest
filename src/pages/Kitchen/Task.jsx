import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

const Task = (props) => {
  const { combos, dishes } = props;

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

  return props.order.orderDetails
    ? props.order.orderDetails.map((detail, index) => {
        const detailCommentsArray = detail.comments?.split("\n");

        return (
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
              <Typography variant="h6"> {props.order.orderNumber}</Typography>
              <p style={{margin: 0, padding: 0}}>
                {detail.qty}x{" "}
                {getDishName(detail.dishId) || getComboName(detail.comboId)}
              </p>
              {detail.comments && (
                <Fragment>
                  <p style={{margin: '10px 0'}}>Comentarios:</p>
                  {detailCommentsArray.map((comment, index) => (
                    <p
                      key={index}
                      // style={{ padding: "5px 0", margin: "5px 0" }}
                      style={{margin: 0, padding: 0}}
                    >
                      - {comment}
                    </p>
                  ))}
                </Fragment>
              )}
            </div>
          )
        );
      })
    : null;
};

export default Task;
