import React from "react";
import { TextField, makeStyles, FormControl, Grid } from "@material-ui/core";
import { AddButton, CancelButton } from "../UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  addSupplyAction,
  updateSupplyAction,
} from "../../redux/actions/supplies/supplies";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    // width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const SuppliesFormik = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { toggle, payload } = props;

  return (
    <Formik
      initialValues={{
        name: payload ? payload.name : "",
        description: payload ? payload.description : "",
        minimumQty: payload ? payload.minimumQty : "",
        presentation: payload ? payload.presentation : "",
        unitOfMeasure: payload ? payload.unitOfMeasure : "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Requerido"),
        presentation: Yup.string().required("Requerido"),
        description: Yup.string().required("Requerido"),
        unitOfMeasure: Yup.string().required("Requerido"),
        minimumQty: Yup.number().required("Requerido"),
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

          const supply = {
            Name: values.name,
            Description: values.description,
            MinimumQty: values.minimumQty,
            Presentation: values.presentation,
            UnitOfMeasure: values.unitOfMeasure,
          };

          if (payload) {
            dispatch(updateSupplyAction({ ...supply, Id: payload.id }));
          } else {
            dispatch(addSupplyAction(supply));
          }

          toggle();
        };

        return (
          <React.Fragment>
            <form className={classes.form} onSubmit={onSubmit}>
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
                      error={errors.presentation && touched.presentation}
                      id="presentation"
                      label="Presentación"
                      variant="outlined"
                      value={values.presentation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.presentation && touched.presentation
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.presentation && touched.presentation && (
                      <div className="input-feedback">
                        {errors.presentation}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth={true}>
                    <TextField
                      error={errors.unitOfMeasure && touched.unitOfMeasure}
                      id="unitOfMeasure"
                      label="Unidad de Medida"
                      variant="outlined"
                      value={values.unitOfMeasure}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.unitOfMeasure && touched.unitOfMeasure
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.unitOfMeasure && touched.unitOfMeasure && (
                      <div className="input-feedback">
                        {errors.unitOfMeasure}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth={true}>
                    <TextField
                      error={errors.minimumQty && touched.minimumQty}
                      id="minimumQty"
                      label="Cantidad Mínima"
                      variant="outlined"
                      type="number"
                      inputProps={{ min: "0", step: "1" }}
                      value={values.minimumQty}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.minimumQty && touched.minimumQty
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.minimumQty && touched.minimumQty && (
                      <div className="input-feedback">{errors.minimumQty}</div>
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
                      rows={4}
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

export default SuppliesFormik;
