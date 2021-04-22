import React from "react";
import { TextField, FormControl, Grid, DialogContent } from "@material-ui/core";
import { AddButton, CancelButton } from "components/UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import TableCustomers from "components/Table/TableCustomers";
import { useDispatch } from "react-redux";
import { updateTableAction } from "redux/actions/tables/tables";
import { withRouter } from "react-router-dom";

const CustomerFormTables = (props) => {
  const { toggle, table, customers, history } = props;
  const dispatch = useDispatch();
  const tableHeaders = [
    // { title: "ID", field: "id" },
    {
      title: "Nombre Completo",
      field: "name",
      render: (rowData) => `${rowData.name} ${rowData.lastname}`,
    },
  ];

  return (
    <Formik
      initialValues={{
        enteredName: "",
        enteredLastName: "",
        customerId: null,
      }}
      validationSchema={Yup.object().shape({
        enteredName: Yup.string().required("Requerido"),
        enteredLastName: Yup.string().required("Requerido"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          handleChange,
          dirty,
          isSubmitting,
          isValid,
        } = props;

        const getCustomerData = (id) => {
          setFieldValue("customerId", id);

          setFieldValue("enteredName", "");
          setFieldValue("enteredLastName", "");
          setFieldTouched("enteredName", false);
          setFieldTouched("enteredLastName", false);
        };

        const clearCustomerData = () => {
          setFieldValue("customerId", null);
        };

        const onSubmit = (e) => {
          e.preventDefault();

          let tablePayload;

          if (!values.customerId) {
            tablePayload = {
              ...table,
              customerName: values.enteredName,
              customerLastName: values.enteredLastName,
              state: 1,
            };
          } else {
            tablePayload = {
              ...table,
              customerId: values.customerId,
              state: 1,
            };
          }

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
              dispatch(updateTableAction(tablePayload));
              Swal.fire(
                "¡Completado!",
                "La mesa fue asignada satisfactoriamente.",
                "success"
              );
              history.push(`/ordenes/${table.id}/preparar-orden`);
            }
          });
        };

        return (
          <React.Fragment>
            <DialogContent dividers>
              <form className="form-control">
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth={true}>
                      <TextField
                        disabled={!!values.customerId}
                        error={errors.enteredName && touched.enteredName}
                        name="enteredName"
                        label="Nombre"
                        variant="outlined"
                        value={values.enteredName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.enteredName && touched.enteredName
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.enteredName && touched.enteredName && (
                        <div className="input-feedback">
                          {errors.enteredName}
                        </div>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth={true}>
                      <TextField
                        disabled={!!values.customerId}
                        error={
                          errors.enteredLastName && touched.enteredLastName
                        }
                        name="enteredLastName"
                        label="Apellido"
                        variant="outlined"
                        value={values.enteredLastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.enteredLastName && touched.enteredLastName
                            ? "text-input error"
                            : "text-input"
                        }
                      />
                      {errors.enteredLastName && touched.enteredLastName && (
                        <div className="input-feedback">
                          {errors.enteredLastName}
                        </div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TableCustomers
                      payload={customers}
                      tableHeaders={tableHeaders}
                      tableTitle="Clientes"
                      onGetCustomerData={getCustomerData}
                      clearCustomerData={clearCustomerData}
                    />
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
                  disabled={
                    values.customerId
                      ? false
                      : !dirty || isSubmitting || !isValid
                  }
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

CustomerFormTables.propTypes = {
  payload: PropTypes.object,
  toggle: PropTypes.func.isRequired,
};

export default withRouter(CustomerFormTables);
