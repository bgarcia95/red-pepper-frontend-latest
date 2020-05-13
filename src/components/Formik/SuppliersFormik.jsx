import React from "react";
import { TextField, FormControl, Grid } from "@material-ui/core";
import { AddButton, CancelButton } from "../UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import InputMask from "react-input-mask";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  updateSupplierAction,
  addSupplierAction,
} from "../../redux/actions/suppliers/suppliers";
import { useDispatch } from "react-redux";

const SuppliersFormik = (props) => {
  const { toggle, payload } = props;
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: payload ? payload.name : "",
        address: payload ? payload.address : "",
        telephone: payload ? payload.telephone : "",
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

        const onSubmit = (e) => {
          e.preventDefault();

          const supplier = {
            Name: values.name,
            Telephone: values.telephone,
            Address: values.address,
          };

          if (payload) {
            dispatch(updateSupplierAction({ ...supplier, Id: payload.id }));
          } else {
            dispatch(addSupplierAction(supplier));
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
                    <InputMask
                      value={values.telephone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      mask="9999-9999"
                      maskChar=""
                    >
                      {() => (
                        <TextField
                          id="telephone"
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
                <Grid item xs={12}>
                  <FormControl fullWidth={true}>
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
                      multiline
                      rows={4}
                    />
                    {errors.address && touched.address && (
                      <div className="input-feedback">{errors.address}</div>
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

export default SuppliersFormik;
