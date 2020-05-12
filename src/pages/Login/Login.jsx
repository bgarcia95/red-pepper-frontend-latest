import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";

import LoginForm from "../../components/Formik/LoginForm";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Red Pepper {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = (props) => {
  return (
    <Container component="main" maxWidth="xs">
      <LoginForm {...props} />
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withRouter(Login);
