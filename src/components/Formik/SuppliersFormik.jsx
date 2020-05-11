import React from "react";
import { TextField, FormControl, makeStyles } from "@material-ui/core";
import { AddButton, CancelButton } from "../UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";

import { Formik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  center: {
    margin: "0 auto",
  },
}));

const SuppliersFormik = (props) => {
  const classes = useStyles();
  const { toggle } = props;

  return (
    <Formik
      initialValues={{
        name: props.payload ? props.payload.name : "",
        address: props.payload ? props.payload.address : "",
        telephone: props.payload ? props.payload.telephone : "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Requerido"),
        address: Yup.string().required("Requerido"),
        telephone: Yup.string().required("Requerido"),
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

        return (
          <React.Fragment>
            <form className={classes.form}>
              <FormControl fullWidth={true} className={classes.formControl}>
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
              <FormControl fullWidth={true} className={classes.formControl}>
                <TextField
                  error={errors.address && touched.address}
                  id="address"
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
                />
                {errors.address && touched.address && (
                  <div className="input-feedback">{errors.address}</div>
                )}
              </FormControl>
              <FormControl fullWidth={true} className={classes.formControl}>
                <TextField
                  error={errors.telephone && touched.telephone}
                  id="telephone"
                  label="Teléfono"
                  variant="outlined"
                  value={values.telephone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.telephone && touched.telephone
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.telephone && touched.telephone && (
                  <div className="input-feedback">{errors.telephone}</div>
                )}
              </FormControl>
            </form>

            <DialogActions>
              <div className={classes.center}>
                <CancelButton onClick={toggle} variant="contained">
                  Cancelar
                </CancelButton>
                <AddButton
                  onClick={toggle}
                  variant="contained"
                  disabled={!dirty || isSubmitting || !isValid}
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

export default SuppliersFormik;
