import React from "react";
import { TextField, FormControl, Grid } from "@material-ui/core";
import { AddButton, CancelButton } from "../UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  updateTableAction,
  addTableAction,
} from "../../redux/actions/tables/tables";

const TablesFormik = (props) => {
  const { toggle, payload } = props;
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: payload ? payload.name : "",
        description: payload ? payload.description : "",
        chairs: payload ? payload.chairs : "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Requerido"),
        description: Yup.string().required("Requerido"),
        chairs: Yup.number()
          .typeError("Requerido")
          .positive("El valor ingresado debe ser mayor a 0")
          .required(),
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

          const table = {
            Name: values.name,
            Description: values.description,
            Chairs: values.chairs,
          };

          if (payload) {
            dispatch(updateTableAction({ ...table, Id: payload.id }));
          } else {
            dispatch(addTableAction(table));
          }

          toggle();
        };

        return (
          <React.Fragment>
            <form className="form-control" onSubmit={onSubmit}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <FormControl fullWidth={true}>
                    <TextField
                      error={errors.chairs && touched.chairs}
                      id="chairs"
                      type="number"
                      inputProps={{ min: "1", step: "1" }}
                      label="N° de Sillas"
                      variant="outlined"
                      value={values.chairs}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.chairs && touched.chairs
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.chairs && touched.chairs && (
                      <div className="input-feedback">{errors.chairs}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth={true}>
                    <TextField
                      error={errors.description && touched.description}
                      id="description"
                      label="Descripción"
                      variant="outlined"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.description && touched.description
                          ? "text-input error"
                          : "text-input"
                      }
                      multiline
                      rows={3}
                    />
                    {errors.description && touched.description && (
                      <div className="input-feedback">{errors.description}</div>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <DialogActions>
                <div className="center-content">
                  <CancelButton onClick={toggle} variant="contained">
                    Cancelar
                  </CancelButton>
                  <AddButton
                    type="submit"
                    variant="contained"
                    disabled={!dirty || isSubmitting || !isValid}
                  >
                    Confirmar
                  </AddButton>
                </div>
              </DialogActions>
            </form>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

export default TablesFormik;
