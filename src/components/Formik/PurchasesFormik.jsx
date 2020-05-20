import React, { useEffect } from "react";
import { TextField, FormControl, Grid, Divider } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddButton, CancelButton } from "components/UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { getSuppliersAction } from "redux/actions/suppliers/suppliers";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";
import { getSuppliesAction } from "redux/actions/supplies/supplies";
import TablePurchaseDetails from "../Table/TablePurchaseDetails";
import { addPurchaseAction } from "redux/actions/supplies-purchases/purchases";
import Swal from "sweetalert2";
import { createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

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
  },
});

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

  const suppliersSelect = suppliers.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  return (
    <Formik
      initialValues={{
        // invoice header
        invoiceNumber: payload ? payload.invoiceNumber : "",
        providerId: payload ? payload.providerId : null,
        providerName: null,
        providerInputName: "",
        emissionDate: payload ? payload.emissionDate : null,
        // Supply input
        supplyId: null,
        supplyName: null,
        supplyInputName: "",
        quantity: "",
        expirationDate: null,
        unitPrice: "",
        purchaseDetails: payload ? payload.details : [],
        total: payload ? payload.total : "",
        locale: "es",
      }}
      validationSchema={Yup.object().shape({
        invoiceNumber: Yup.number()
          .typeError("El valor ingresado debe ser numérico")
          .positive("El valor debe ingresado debe ser positivo")
          .required("Requerido"),
        providerInputName: Yup.string().required("Requerido"),
        emissionDate: Yup.date().typeError("Requerido").required(),
        supplyInputName: Yup.string().required("Requerido"),
        quantity: Yup.number()
          .positive("El valor ingresado debe ser mayor a 0")
          .required("Requerido"),
        unitPrice: Yup.number()
          .positive("El valor ingresado debe ser mayor a 0")
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
            supplyId: values.supplyId,
            expirationDate: values.expirationDate,
            desc: values.supplyName,
            quantity: values.quantity,
            unitPrice: values.unitPrice,
            total: price,
          };

          values.purchaseDetails = [...values.purchaseDetails, supply];

          clearDetailHandler();
        };

        const onDeleteItem = (id) => {
          setFieldValue(
            "purchaseDetails",
            values.purchaseDetails.filter((item) => item.supplyId !== id)
          );
        };

        // To handle invoice total and pass following variables and functions as props for table details

        const TAX_RATE = 0.13;

        const subtotal = (items) => {
          return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
        };

        const invoiceSubtotal = subtotal(values.purchaseDetails);
        const invoiceTaxes = TAX_RATE * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;

        const onSubmit = (e) => {
          e.preventDefault();

          const purchaseDetails = values.purchaseDetails.map((detail) => ({
            SupplyId: detail.supplyId,
            ExpirationDate:
              detail.expDate === null ? "0001-01-01 00:00:00" : detail.expDate,
            Quantity: detail.quantity,
            UnitPrice: detail.unitPrice,
            Total: detail.total,
          }));

          const purchase = {
            InvoiceNumber: values.invoiceNumber,
            EmissionDate: values.emissionDate,
            ProviderId: values.providerId,
            Total: invoiceTotal,
            Details: purchaseDetails,
          };

          Swal.fire({
            title: "¿Estás seguro/a?",
            text: "Se procederá con el registro de la factura  ",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, guardar!",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.value) {
              dispatch(addPurchaseAction(purchase));
              Swal.fire(
                "¡Completado!",
                "La factura fué registrada satisfactoriamente.",
                "success"
              );

              toggle();
            }
          });
        };

        const filteredProvider = (id) =>
          suppliers
            .filter((supplier) => supplier.id === id)
            .map((filtered) => filtered.name);

        return (
          <React.Fragment>
            <form className="form-control">
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
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
                    {payload ? (
                      <TextField
                        label="Proveedor"
                        variant="outlined"
                        value={filteredProvider(payload.providerId)}
                        disabled={payload ? true : false}
                      />
                    ) : (
                      <React.Fragment>
                        <Autocomplete
                          id="providerInputName"
                          name="providerInputName"
                          options={suppliersSelect}
                          getOptionLabel={(option) =>
                            typeof option === "string" ? option : option.label
                          }
                          getOptionSelected={(option, value) =>
                            value === option.label
                          }
                          value={values.providerName}
                          onChange={(event, newValue) => {
                            if (newValue !== null) {
                              setFieldValue("providerName", newValue.label);
                              setFieldValue("providerId", newValue.value);
                              setFieldValue(
                                "providerInputName",
                                newValue.label
                              );
                            }
                          }}
                          inputValue={values.providerInputName}
                          onInputChange={(event, newInputValue, reason) => {
                            setFieldValue("providerInputName", newInputValue);

                            if (event.target.value === "") {
                              setFieldValue("providerInputName", "");
                              setFieldValue("providerName", null);
                              setFieldValue("providerId", null);
                            }
                            if (reason === "clear") {
                              setFieldValue("providerName", null);
                              setFieldValue("providerId", null);
                              setFieldValue("providerInputName", "");
                            }
                          }}
                          className={
                            errors.providerInputName &&
                            touched.providerInputName
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
                              label="Proveedor"
                              variant="outlined"
                              error={
                                errors.providerInputName &&
                                touched.providerInputName
                              }
                            />
                          )}
                        />
                        {errors.providerInputName &&
                          touched.providerInputName && (
                            <div className="input-feedback">
                              {errors.providerInputName}
                            </div>
                          )}
                      </React.Fragment>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth={true}>
                    {payload ? (
                      <TextField
                        label="Fecha de Emisión"
                        variant="outlined"
                        value={moment(values.emissionDate).format("DD/MM/YYYY")}
                        disabled={payload ? true : false}
                      />
                    ) : (
                      <ThemeProvider theme={defaultMaterialTheme}>
                        <MuiPickersUtilsProvider
                          libInstance={moment}
                          utils={MomentUtils}
                          locale={values.locale}
                        >
                          <KeyboardDatePicker
                            id="emissionDate"
                            name="emissionDate"
                            label="Fecha de Emision"
                            value={values.emissionDate}
                            onChange={(date) =>
                              setFieldValue(
                                "emissionDate",
                                moment(date).format("MM/DD/YYYY")
                              )
                            }
                            autoOk
                            disableFuture={true}
                            error={errors.emissionDate && touched.emissionDate}
                            onBlur={handleBlur}
                            className={
                              errors.emissionDate && touched.emissionDate
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
                            disabled={payload ? true : false}
                          />
                        </MuiPickersUtilsProvider>
                        {errors.emissionDate && touched.emissionDate && (
                          <div className="input-feedback">
                            {errors.emissionDate}
                          </div>
                        )}
                      </ThemeProvider>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                {payload ? null : (
                  <React.Fragment>
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
                                errors.supplyInputName &&
                                touched.supplyInputName
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
                        <ThemeProvider theme={defaultMaterialTheme}>
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
                              error={
                                errors.expirationDate && touched.expirationDate
                              }
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
                              disabled={payload ? true : false}
                            />
                          </MuiPickersUtilsProvider>
                          {errors.expirationDate && touched.expirationDate && (
                            <div className="input-feedback">
                              {errors.expirationDate}
                            </div>
                          )}
                        </ThemeProvider>
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
                          <div className="input-feedback">
                            {errors.quantity}
                          </div>
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
                          <div className="input-feedback">
                            {errors.unitPrice}
                          </div>
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
                          values.quantity <= 0 ||
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
                  </React.Fragment>
                )}

                <Grid item xs={12}>
                  <TablePurchaseDetails
                    purchaseDetails={values.purchaseDetails}
                    onDeleteItem={onDeleteItem}
                    invoiceTotal={invoiceTotal}
                    TAX_RATE={TAX_RATE}
                    invoiceSubtotal={invoiceSubtotal}
                    invoiceTaxes={invoiceTaxes}
                    supplies={supplies}
                    fetchedDetails={payload ? payload.details : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
              <DialogActions>
                <div className="center-content">
                  {payload ? (
                    <React.Fragment>
                      <CancelButton onClick={toggle} variant="contained">
                        Cerrar
                      </CancelButton>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <CancelButton onClick={toggle} variant="contained">
                        Cancelar
                      </CancelButton>
                      <AddButton
                        type="submit"
                        variant="contained"
                        disabled={
                          !values.invoiceNumber ||
                          !values.providerName ||
                          !values.emissionDate ||
                          values.purchaseDetails.length === 0
                        }
                        onClick={(e) => onSubmit(e)}
                      >
                        Confirmar
                      </AddButton>
                    </React.Fragment>
                  )}
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
