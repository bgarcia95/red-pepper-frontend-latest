import React from "react";
import { TextField, FormControl, Grid, DialogContent } from "@material-ui/core";
import { AddButton, CancelButton } from "components/UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateTableAction, addTableAction } from "redux/actions/tables/tables";
import PropTypes from "prop-types";

const TablesForm = (props) => {
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
            <DialogContent dividers>
              <form className="form-control">
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        error={errors.name && touched.name}
                        name="name"
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
                  <Grid item xs={6}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        error={errors.chairs && touched.chairs}
                        name="chairs"
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
                        required
                        error={errors.description && touched.description}
                        name="description"
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
                        <div className="input-feedback">
                          {errors.description}
                        </div>
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

TablesForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  payload: PropTypes.object,
};

export default TablesForm;
