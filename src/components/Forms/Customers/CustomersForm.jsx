import React from "react";
import { TextField, FormControl, Grid, DialogContent } from "@material-ui/core";
import { AddButton, CancelButton } from "components/UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  updateCustomerAction,
  addCustomerAction,
} from "redux/actions/customers/customers";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const CustomersForm = (props) => {
  const { toggle, payload } = props;
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: payload ? payload.name : "",
        lastName: payload ? payload.lastname : "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Requerido"),
        lastName: Yup.string().required("Requerido"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          isValid,
        } = props;

        const onSubmit = (e) => {
          e.preventDefault();

          const customer = {
            name: values.name,
            lastname: values.lastName,
          };

          if (payload) {
            Swal.fire({
              title: "¿Estás seguro/a?",
              text: "Se procederá con la actualización del cliente",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Sí, actualizar!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                dispatch(updateCustomerAction({ ...customer, id: payload.id }));
                Swal.fire(
                  "¡Completado!",
                  "El cliente fue actualizado satisfactoriamente.",
                  "success"
                );
              }
            });
          } else {
            Swal.fire({
              title: "¿Estás seguro/a?",
              text: "Se procederá con el registro del cliente",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Sí, guardar!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                dispatch(addCustomerAction(customer));
                Swal.fire(
                  "¡Completado!",
                  "El empleado fue registrado satisfactoriamente.",
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
                        error={errors.name && touched.name}
                        id="name"
                        label="Nombre"
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
                        error={errors.lastName && touched.lastName}
                        id="lastName"
                        label="Apellido"
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
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <div className="center-content">
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
              </div>
            </DialogActions>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

CustomersForm.propTypes = {
  payload: PropTypes.object,
  toggle: PropTypes.func.isRequired,
};

export default CustomersForm;
