import { withStyles, Button } from "@material-ui/core";

// Action Buttons

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
