import React from "react";
import { TextField, FormControl, Grid, DialogContent } from "@material-ui/core";
import { AddButton, CancelButton } from "components/UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const CustomersFormTables = (props) => {
  const { toggle, handleSubmit, table } = props;

  return (
    <Formik
      initialValues={{
        name: table.customer ? table.customer.name : "",
        lastName: table.customer ? table.customer.lastname : "",
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

          if (table) {
            // Swal.fire({
            //   title: "¿Estás seguro/a?",
            //   text: "Se procederá con la actualización del cliente",
            //   showCancelButton: true,
            //   confirmButtonColor: "#3085d6",
            //   cancelButtonColor: "#d33",
            //   confirmButtonText: "¡Sí, actualizar!",
            //   cancelButtonText: "Cancelar",
            // }).then((result) => {
            //   if (result.value) {
            //     handleSubmit(payload.id, customer)
            //     Swal.fire(
            //       "¡Completado!",
            //       "El cliente fue actualizado satisfactoriamente.",
            //       "success"
            //     );
            //   }
            // });
            // } else {
            //   Swal.fire({
            //     title: "¿Estás seguro/a?",
            //     text: "Se procederá con el registro del cliente",
            //     showCancelButton: true,
            //     confirmButtonColor: "#3085d6",
            //     cancelButtonColor: "#d33",
            //     confirmButtonText: "¡Sí, guardar!",
            //     cancelButtonText: "Cancelar",
            //   }).then((result) => {
            //     if (result.value) {
            //       Swal.fire(
            //         "¡Completado!",
            //         "El empleado fue registrado satisfactoriamente.",
            //         "success"
            //       );

            //       toggle();
            //     }
            //   });
            // }
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
                handleSubmit(table.id, customer);

                Swal.fire(
                  "¡Completado!",
                  "La mesa fue asignada satisfactoriamente.",
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

CustomersFormTables.propTypes = {
  payload: PropTypes.object,
  toggle: PropTypes.func.isRequired,
};

export default CustomersFormTables;
