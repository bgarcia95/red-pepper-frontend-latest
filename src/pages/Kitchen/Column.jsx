import React from "react";
import { Typography } from "@material-ui/core";

import Task from "./Task";
import { green, orange, red } from "@material-ui/core/colors";

const Column = (props) => {
  const getBgColor = (title) => {
    switch (title) {
      case "En Cola":
        return red[500];

      case "En Proceso":
        return orange[500];

      case "Finalizado":
        return green[500];

      default:
        return "inherit";
    }
  };

  const inQueueDetails = props.orders
    ?.map((or) => {
      return or.orderDetails?.map((det) => {
        if (det.status === props.column.status) {
          return det;
        } else {
          return null;
        }
      });
    })
    .map((det) => {
      return det?.filter((d) => d !== null && d.status === props.column.status);
    })
    .map((det) => {
      return det?.findIndex((d) => d.status === props.column.status);
    })
    .filter((det) => det > -1);

  return (
    <div
      style={{
        margin: "8px",
        border: "1px solid lightgrey",
        borderRadius: "2px",
        minWidth: "360px",

        maxHeight: "75vh",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 8,
          borderBottom: "1px solid lightgrey",
          textAlign: "center",
          backgroundColor: getBgColor(props.column.title),
        }}
      >
        <Typography variant="h5" style={{ color: "#fff" }}>
          {props.column.title}
        </Typography>
      </div>
      <div
        style={{
          padding: "8px",
          transition: "background-color 0.2s ease",
          backgroundColor: "white",
          flexGrow: 1,
          minHeight: "100px",
          overflowY: "scroll",
        }}
      >
        {props.orders.length === 0 && (
          <div style={{ textAlign: "center" }}>
            No existen ordenes actualmente
          </div>
        )}
        {props.orders.map((order, index) => {
          return inQueueDetails.length === 0 ? (
            <p style={{ textAlign: "center" }} key={index}>
              No existen detalles actualmente
            </p>
          ) : props.orders.length === 0 ? (
            <p style={{ textAlign: "center" }} key={index}>
              No existen ordenes actualmente
            </p>
          ) : (
            <Task
              key={order.id}
              order={order}
              index={index}
              combos={props.combos}
              dishes={props.dishes}
              status={props.column.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Column;
