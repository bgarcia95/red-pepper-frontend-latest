import { withStyles, Button } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

// Action Buttons

export const AddButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[800],
    },
    height: "50px",
  },
}))(Button);

export const EditButton = withStyles((theme) => ({
  root: {
    height: "30px",
  },
}))(Button);

export const DeleteButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "rgba(255,0,0, 0.8)",
    "&:hover": {
      backgroundColor: "rgba(255,0,0, 1)",
    },
    height: "30px",
  },
}))(Button);

export const CancelButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "rgba(38, 70, 83, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(38, 70, 83, 1)",
    },
    height: "50px",
  },
}))(Button);
