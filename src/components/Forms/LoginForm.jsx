import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Formik } from "formik";
import * as Yup from "yup";
import { AddButton } from "components/UI/Buttons/Buttons";
import { useDispatch } from "react-redux";
import { loginAction } from "redux/actions/auth/auth";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const LoginForm = (props) => {
  const { history, error } = props;
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
            if (!error) {
              history.push("/insumos");
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
                  id="password"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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

export default LoginForm;
