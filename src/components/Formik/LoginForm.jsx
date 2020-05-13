import React from "react";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Formik } from "formik";
import * as Yup from "yup";
import { AddButton } from "../UI/Buttons/Buttons";
import { useDispatch, connect } from "react-redux";
import { loginAction } from "../../redux/actions/auth/auth";

const LoginForm = (props) => {
  const { history, error } = props;
  const dispatch = useDispatch();

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

          dispatch(loginAction(user)).then(() => {
            if (!error && error !== null) {
              history.push("/supplies");
            }
          });
        };

        return (
          <React.Fragment>
            <div className="login-container">
              <Typography component="h1" variant="h5">
                Iniciar Sesión
              </Typography>
              <form className="form-control" onSubmit={onSubmit}>
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
                  className="button--submit"
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

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

export default connect(mapStateToProps)(LoginForm);
