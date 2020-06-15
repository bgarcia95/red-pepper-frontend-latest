import React from "react";
import { Radio, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const GenderRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
