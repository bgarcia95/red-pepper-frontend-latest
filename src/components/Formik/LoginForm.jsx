import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Formik } from "formik";
import { login } from "../../services/authService";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { AddButton } from "../UI/Buttons/Buttons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();
  const { history } = props;

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {(props) => {
        const {
          values,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          isValid,
        } = props;

        const onSubmit = async (e) => {
          e.preventDefault();
          const user = {
            Username: values.username,
            Password: values.password,
          };

          try {
            await login(user);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Bienvenido/a!",
              showConfirmButton: false,
              timer: 1500,
            });
            history.push("/supplies");
          } catch (error) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: error,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        };

        return (
          <React.Fragment>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Iniciar Sesión
              </Typography>
              <form className={classes.form} onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Usuario"
                  name="username"
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <AddButton
                  type="submit"
                  fullWidth
                  className={classes.submit}
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  Ingresar
                </AddButton>
              </form>
            </div>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
