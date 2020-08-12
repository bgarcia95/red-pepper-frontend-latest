import React from "react";
import { Typography } from "@material-ui/core";

import Task from "./Task";

const Column = (props) => {
  return (
    <div
      style={{
        margin: "8px",
        border: "1px solid lightgrey",
        borderRadius: "2px",
        width: "260px",

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
        }}
      >
        <Typography variant="h5">{props.column.title}</Typography>
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
        {props.tasks.map((task, index) => {
          return (
            <Task
              key={task.id}
              task={task}
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
