import React from "react";
import {
  TextField,
  FormControl,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  DialogContent,
} from "@material-ui/core";
import { AddButton, CancelButton } from "components/UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";
import Swal from "sweetalert2";
import { createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import {
  addEmployeeAction,
  updateEmployeeAction,
} from "redux/actions/employees/employees";
import InputMask from "react-input-mask";
import PropTypes from "prop-types";
import { GenderRadio } from "components/UI/Buttons/GenderRadioButton";

moment.locale("es");

const defaultMaterialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: green[700],
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: green[400],
        "&:hover": {
          backgroundColor: green[700],
          color: "white",
        },
      },
      current: {
        color: green[900],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: green[400],
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: green[700],
      },
      root: {
        "&:focus": {
          color: green[700],
        },
      },
    },
    MuiPickersMonth: {
      monthSelected: {
        color: green[700],
      },
      root: {
        "&:focus": {
          color: green[700],
        },
      },
    },
  },
});

const EmployeesForm = (props) => {
  const { toggle, payload } = props;
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        name: payload ? payload.name : "",
        lastName: payload ? payload.lastname : "",
        gender: payload ? payload.sex : "",
        birthDate: payload ? payload.birthdate : null,
        dui: payload ? payload.dui : "",
        nit: payload ? payload.nit : "",
        address: payload ? payload.address : "",
        telephone: payload ? payload.telephone : "",
        email: payload ? payload.email : "",
        locale: "es",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Requerido"),
        lastName: Yup.string().required("Requerido"),
        gender: Yup.string().required("Requerido"),
        birthDate: Yup.date().typeError("Requerido").required(),
        dui: Yup.string()
          .min(10, "El campo debe contener 9 digitos")
          .required("Requerido"),
        nit: Yup.string()
          .min(17, "El campo debe contener 14 digitos")
          .required("Requerido"),
        address: Yup.string().required("Requerido"),
        telephone: Yup.string()
          .min(9, "El campo debe contener 8 digitos")
          .required("Requerido"),
        email: Yup.string()
          .email("Ingrese un correo válido")
          .required("Requerido"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
          isValid,
          dirty,
          isSubmitting,
        } = props;

        const onSubmit = (e) => {
          e.preventDefault();

          const employee = {
            name: values.name,
            lastname: values.lastName,
            sex: values.gender,
            birthdate: values.birthDate,
            dui: values.dui,
            nit: values.nit,
            address: values.address,
            telephone: values.telephone,
            email: values.email,
          };

          if (payload) {
            Swal.fire({
              title: "¿Estás seguro/a?",
              text: "Se procederá con la actualización del empleado",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Sí, actualizar!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                dispatch(updateEmployeeAction({ ...employee, id: payload.id }));
                Swal.fire(
                  "¡Completado!",
                  "El empleado fue actualizado satisfactoriamente.",
                  "success"
                );
              }
            });
          } else {
            Swal.fire({
              title: "¿Estás seguro/a?",
              text: "Se procederá con el registro del empleado",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Sí, guardar!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                dispatch(addEmployeeAction(employee));
                Swal.fire(
                  "¡Completado!",
                  "El empleado fue guardado satisfactoriamente.",
                  "success"
                );

                toggle();
              }
            });
          }
        };

        return (
          <React.Fragment>
            <DialogContent dividers>
              <form className="form-control">
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        error={errors.name && touched.name}
                        name="name"
                        label="Nombres"
                        variant="outlined"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.name && touched.name
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        error={errors.lastName && touched.lastName}
                        name="lastName"
                        label="Apellidos"
                        variant="outlined"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.lastName && touched.lastName
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.lastName && touched.lastName && (
                        <div className="input-feedback">{errors.lastName}</div>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl
                      fullWidth={true}
                      className="form--fieldset"
                      component="fieldset"
                    >
                      <FormLabel focused={false} component="legend">
                        <span style={{ margin: "0 5px", fontSize: "13px" }}>
                          Género
                        </span>
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-label="gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        style={{ justifyContent: "center" }}
                      >
                        <FormControlLabel
                          value="F"
                          control={<GenderRadio />}
                          label="Femenino"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="M"
                          control={<GenderRadio />}
                          label="Masculino"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth={true}>
                      <ThemeProvider theme={defaultMaterialTheme}>
                        <MuiPickersUtilsProvider
                          libInstance={moment}
                          utils={MomentUtils}
                          locale={values.locale}
                        >
                          <KeyboardDatePicker
                            required
                            name="birthDate"
                            label="Fecha de Nacimiento"
                            value={values.birthDate}
                            onChange={(date) =>
                              setFieldValue(
                                "birthDate",
                                moment(date, "YYYY-MM-DDThh:mm:ss").format(
                                  "YYYY-MM-DD"
                                )
                              )
                            }
                            autoOk
                            openTo="year"
                            views={["year", "month", "date"]}
                            disableFuture={true}
                            error={errors.birthDate && touched.birthDate}
                            onBlur={handleBlur}
                            className={
                              errors.birthDate && touched.birthDate
                                ? "text-input error"
                                : "text-input"
                            }
                            variant="inline"
                            inputVariant="outlined"
                            format="DD/MM/YYYY"
                            InputAdornmentProps={{ position: "end" }}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                            invalidDateMessage="Formato de fecha incorrecto"
                          />
                        </MuiPickersUtilsProvider>
                        {errors.birthDate && touched.birthDate && (
                          <div className="input-feedback">
                            {errors.birthDate}
                          </div>
                        )}
                      </ThemeProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth={true}>
                      <InputMask
                        value={values.dui}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        mask="99999999-9"
                        maskChar=""
                      >
                        {() => (
                          <TextField
                            required
                            name="dui"
                            label="DUI"
                            variant="outlined"
                            error={errors.dui && touched.dui}
                            className={
                              errors.dui && touched.dui
                                ? "text-input error"
                                : "text-input"
                            }
                          />
                        )}
                      </InputMask>

                      {errors.dui && touched.dui && (
                        <div className="input-feedback">{errors.dui}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth={true}>
                      <InputMask
                        value={values.nit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        mask="9999-999999-999-9"
                        maskChar=""
                      >
                        {() => (
                          <TextField
                            required
                            name="nit"
                            label="NIT"
                            variant="outlined"
                            error={errors.nit && touched.nit}
                            className={
                              errors.nit && touched.nit
                                ? "text-input error"
                                : "text-input"
                            }
                          />
                        )}
                      </InputMask>

                      {errors.nit && touched.nit && (
                        <div className="input-feedback">{errors.nit}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth={true}>
                      <InputMask
                        value={values.telephone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        mask="9999-9999"
                        maskChar=""
                      >
                        {() => (
                          <TextField
                            required
                            name="telephone"
                            label="Teléfono"
                            variant="outlined"
                            error={errors.telephone && touched.telephone}
                            className={
                              errors.telephone && touched.telephone
                                ? "text-input error"
                                : "text-input"
                            }
                          />
                        )}
                      </InputMask>

                      {errors.telephone && touched.telephone && (
                        <div className="input-feedback">{errors.telephone}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        error={errors.email && touched.email}
                        name="email"
                        label="Correo electrónico"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.email && touched.email
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        error={errors.address && touched.address}
                        name="address"
                        label="Dirección"
                        variant="outlined"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.address && touched.address
                            ? "text-input error"
                            : "text-input"
                        }
                        multiline
                        rows={3}
                      />
                      {errors.address && touched.address && (
                        <div className="input-feedback">{errors.address}</div>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <div className="center-content">
                <React.Fragment>
                  <CancelButton onClick={toggle} variant="contained">
                    Cancelar
                  </CancelButton>
                  <AddButton
                    variant="contained"
                    disabled={!dirty || isSubmitting || !isValid}
                    onClick={(e) => onSubmit(e)}
                  >
                    Confirmar
                  </AddButton>
                </React.Fragment>
              </div>
            </DialogActions>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

EmployeesForm.propTypes = {
  payload: PropTypes.object,
  toggle: PropTypes.func.isRequired,
};

export default EmployeesForm;
