import React, { useEffect } from "react";
import { TextField, FormControl, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddButton, CancelButton } from "../UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { getSuppliersAction } from "../../redux/actions/suppliers/suppliers";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";
moment.locale("es");

const PurchasesFormik = (props) => {
  const { toggle, payload } = props;
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const dispatch = useDispatch();
  useEffect(() => {
    const getSuppliers = () => dispatch(getSuppliersAction());
    getSuppliers();
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        invoiceNumber: payload ? payload.invoiceNumber : "",
        emmisionDate: payload ? payload.emmisionDate : null,
        providerId: payload ? payload.providerId : null,
        providerName: "",
        presentation: payload ? payload.presentation : "",
        total: payload ? payload.total : 0.0,
        locale: "es",
      }}
      validationSchema={Yup.object().shape({
        invoiceNumber: Yup.number()
          .typeError("El valor ingresado debe ser numérico")
          .positive("El valor debe ingresado debe ser positivo")
          .required("Requerido"),
        // emmisionDate: Yup.string().required("Requerido"),
        providerName: Yup.string().required("Requerido"),
        total: Yup.number()
          .min(1, "El valor minimo debe ser igual o mayor a $1")
          .typeError("Requerido")
          .required("Requerido"),
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
          setFieldValue,
        } = props;

        return (
          <React.Fragment>
            <form className="form-control">
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth={true}>
                    <TextField
                      error={errors.invoiceNumber && touched.invoiceNumber}
                      id="invoiceNumber"
                      label="N° de Factura"
                      variant="outlined"
                      value={values.invoiceNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.invoiceNumber && touched.invoiceNumber
                          ? "text-input error"
                          : "text-input"
                      }
                      disabled={payload ? true : false}
                    />
                    {errors.invoiceNumber && touched.invoiceNumber && (
                      <div className="input-feedback">
                        {errors.invoiceNumber}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth={true}>
                    <Autocomplete
                      id="providerName"
                      name="providerName"
                      options={suppliers}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, newValue) => {
                        if (newValue != null) {
                          setFieldValue("providerId", newValue.id);
                          setFieldValue("providerName", newValue.name);
                        }
                      }}
                      onInputChange={(e, newValue, reason) => {
                        if (newValue != null) {
                          setFieldValue("providerName", newValue.name);
                          if (e.target.value === "") {
                            setFieldValue("providerId", null);
                          }
                        }
                        if (reason === "clear") {
                          setFieldValue("providerName", "");
                          setFieldValue("providerId", null);
                        }
                      }}
                      className={
                        errors.providerName && touched.providerName
                          ? "text-input error"
                          : "text-input"
                      }
                      onBlur={handleBlur}
                      disabled={payload ? true : false}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Proveedor"
                          variant="outlined"
                          error={errors.providerName && touched.providerName}
                        />
                      )}
                    />
                    {errors.providerName && touched.providerName && (
                      <div className="input-feedback">
                        {errors.providerName}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth={true}>
                    {/* <TextField
                      error={errors.emmisionDate && touched.emmisionDate}
                      id="emmisionDate"
                      label="Fecha de Emisión"
                      variant="outlined"
                      value={values.emmisionDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.emmisionDate && touched.emmisionDate
                          ? "text-input error"
                          : "text-input"
                      }
                      disabled={payload ? true : false}
                    />
                    {errors.emmisionDate && touched.emmisionDate && (
                      <div className="input-feedback">
                        {errors.emmisionDate}
                      </div>
                    )} */}
                    <MuiPickersUtilsProvider
                      libInstance={moment}
                      utils={MomentUtils}
                      locale={values.locale}
                    >
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="DD/MM/YYYY"
                        margin="normal"
                        id="date-picker-inline"
                        label="Fecha de Emision"
                        value={values.emmisionDate}
                        onChange={(date) =>
                          setFieldValue(
                            "emmisionDate",
                            moment(date).format("MM/DD/YYYY")
                          )
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth={true}>
                    <TextField
                      error={errors.total && touched.total}
                      id="total"
                      label="Total"
                      variant="outlined"
                      type="number"
                      inputProps={{ min: "0", step: "0.5" }}
                      value={values.total}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.total && touched.total
                          ? "text-input error"
                          : "text-input"
                      }
                      disabled={payload ? true : false}
                    />
                    {errors.total && touched.total && (
                      <div className="input-feedback">{errors.total}</div>
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
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("clicked!");
                    }}
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

export default PurchasesFormik;
