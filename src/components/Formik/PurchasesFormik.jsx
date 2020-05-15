import React, { useEffect } from "react";
import { TextField, FormControl, Grid, Divider } from "@material-ui/core";
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
import { getSuppliesAction } from "../../redux/actions/supplies/supplies";
import TablePurchaseDetails from "../Table/TablePurchaseDetails";
moment.locale("es");

const PurchasesFormik = (props) => {
  const { toggle, payload } = props;
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const supplies = useSelector((state) => state.supplies.supplies);
  const dispatch = useDispatch();
  useEffect(() => {
    const getSuppliers = () => dispatch(getSuppliersAction());
    getSuppliers();
    const getSupplies = () => dispatch(getSuppliesAction());
    getSupplies();
  }, [dispatch]);

  const suppliesSelect = supplies.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  return (
    <Formik
      initialValues={{
        invoiceNumber: payload ? payload.invoiceNumber : "",
        emmisionDate: payload ? payload.emmisionDate : null,
        providerId: payload ? payload.providerId : null,
        providerName: "",
        supplyId: null,
        supplyName: null,
        supplyInputName: "",
        quantity: "",
        expirationDate: null,
        unitPrice: "",
        presentation: payload ? payload.presentation : "",
        purchaseDetails: [],
        total: payload ? payload.total : 0.0,
        locale: "es",
      }}
      validationSchema={Yup.object().shape({
        invoiceNumber: Yup.number()
          .typeError("El valor ingresado debe ser numérico")
          .positive("El valor debe ingresado debe ser positivo")
          .required("Requerido"),
        providerName: Yup.string().required("Requerido"),
        emmisionDate: Yup.date().typeError("Requerido").required(),
        quantity: Yup.number()
          .positive("El valor ingresado debe ser mayor a 0")
          .required("Requerido"),
        unitPrice: Yup.number()
          .positive("El valor ingresado debe ser mayor a 0")
          .required("Requerido"),
        supplyInputName: Yup.string().required("Requerido"),
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
          setFieldTouched,
        } = props;

        const clearDetailHandler = () => {
          setFieldValue("supplyName", null);
          setFieldValue("supplyId", null);
          setFieldValue("supplyInputName", "");
          setFieldValue("expirationDate", null);
          setFieldValue("quantity", "");
          setFieldValue("unitPrice", "");

          setFieldTouched("supplyInputName", false);
          setFieldTouched("quantity", false);
          setFieldTouched("unitPrice", false);
          setFieldTouched("expirationDate", false);
        };

        const onSubmitSupply = (e) => {
          e.preventDefault();
          const price = values.quantity * values.unitPrice;
          const supply = {
            desc: values.supplyName,
            qty: values.quantity,
            unit: values.unitPrice,
            total: price,
          };

          values.purchaseDetails = [...values.purchaseDetails, supply];

          // Cleaning fields

          clearDetailHandler();
        };

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
                      noOptionsText="No hay opciones"
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
                    <MuiPickersUtilsProvider
                      libInstance={moment}
                      utils={MomentUtils}
                      locale={values.locale}
                    >
                      <KeyboardDatePicker
                        id="emmisionDate"
                        name="emmisionDate"
                        label="Fecha de Emision"
                        value={values.emmisionDate}
                        onChange={(date) =>
                          setFieldValue(
                            "emmisionDate",
                            moment(date).format("MM/DD/YYYY")
                          )
                        }
                        autoOk
                        error={errors.emmisionDate && touched.emmisionDate}
                        onBlur={handleBlur}
                        className={
                          errors.emmisionDate && touched.emmisionDate
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
                    {errors.emmisionDate && touched.emmisionDate && (
                      <div className="input-feedback">
                        {errors.emmisionDate}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth={true}>
                    <Autocomplete
                      id="supplyInputName"
                      name="supplyInputName"
                      options={suppliesSelect}
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.label
                      }
                      getOptionSelected={(option, value) =>
                        value === option.label
                      }
                      value={values.supplyName}
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          setFieldValue("supplyName", newValue.label);
                          setFieldValue("supplyId", newValue.value);
                          setFieldValue("supplyInputName", newValue.label);
                        }
                      }}
                      inputValue={values.supplyInputName}
                      onInputChange={(event, newInputValue, reason) => {
                        setFieldValue("supplyInputName", newInputValue);

                        if (event.target.value === "") {
                          setFieldValue("supplyInputName", "");
                          setFieldValue("supplyName", null);
                          setFieldValue("supplyId", null);
                        }
                        if (reason === "clear") {
                          setFieldValue("supplyName", null);
                          setFieldValue("supplyId", null);
                          setFieldValue("supplyInputName", "");
                        }
                      }}
                      className={
                        errors.supplyInputName && touched.supplyInputName
                          ? "text-input error"
                          : "text-input"
                      }
                      onBlur={handleBlur}
                      disabled={payload ? true : false}
                      noOptionsText="No hay opciones"
                      clearText="Limpiar"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Insumo"
                          variant="outlined"
                          error={
                            errors.supplyInputName && touched.supplyInputName
                          }
                        />
                      )}
                    />
                    {errors.supplyInputName && touched.supplyInputName && (
                      <div className="input-feedback">
                        {errors.supplyInputName}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth={true}>
                    <MuiPickersUtilsProvider
                      libInstance={moment}
                      utils={MomentUtils}
                      locale={values.locale}
                    >
                      <KeyboardDatePicker
                        id="expirationDate"
                        name="expirationDate"
                        label="Fecha de Expiración"
                        value={values.expirationDate}
                        onChange={(date) =>
                          setFieldValue(
                            "expirationDate",
                            moment(date).format("MM/DD/YYYY")
                          )
                        }
                        autoOk
                        disablePast={true}
                        error={errors.expirationDate && touched.expirationDate}
                        onBlur={handleBlur}
                        className={
                          errors.expirationDate && touched.expirationDate
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
                    {errors.expirationDate && touched.expirationDate && (
                      <div className="input-feedback">
                        {errors.expirationDate}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth={true}>
                    <TextField
                      id="quantity"
                      name="quantity"
                      label="Cantidad"
                      error={errors.quantity && touched.quantity}
                      variant="outlined"
                      type="number"
                      inputProps={{ min: "1", step: "1" }}
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.quantity && touched.quantity
                          ? "text-input error"
                          : "text-input"
                      }
                      disabled={payload ? true : false}
                    />
                    {errors.quantity && touched.quantity && (
                      <div className="input-feedback">{errors.quantity}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth={true}>
                    <TextField
                      id="unitPrice"
                      name="unitPrice"
                      label="Precio Unitario"
                      error={errors.unitPrice && touched.unitPrice}
                      variant="outlined"
                      type="number"
                      inputProps={{ min: "1", step: "1" }}
                      value={values.unitPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.unitPrice && touched.unitPrice
                          ? "text-input error"
                          : "text-input"
                      }
                      disabled={payload ? true : false}
                    />
                    {errors.unitPrice && touched.unitPrice && (
                      <div className="input-feedback">{errors.unitPrice}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={2}
                  className="text-center"
                  style={{ marginTop: "5px" }}
                >
                  <AddButton
                    disabled={
                      !values.supplyName ||
                      values.unitPrice <= 0 ||
                      values.unitPrice <= 0
                    }
                    variant="contained"
                    onClick={(e) => {
                      onSubmitSupply(e);
                    }}
                  >
                    Agregar Insumo
                  </AddButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <TablePurchaseDetails />
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
