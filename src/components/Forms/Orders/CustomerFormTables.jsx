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

const CustomersFormTables = (props) => {
  const { toggle, table, customers, history } = props;
  const dispatch = useDispatch();
  const tableHeaders = [
    { title: "ID", field: "id" },
    {
      title: "Nombre Completo",
      field: "name",
      render: (rowData) => `${rowData.name} ${rowData.lastname}`,
    },
  ];

  return (
    <Formik
      initialValues={{
        name: "",
        lastName: "",
        customerId: "",
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
          handleBlur,
          setFieldValue,
          setFieldTouched,
        } = props;

        const getCustomerData = (id, name, lastName) => {
          setFieldValue("customerId", id);
          setFieldValue("name", name);
          setFieldValue("lastName", lastName);

          setFieldTouched("name", false);
          setFieldTouched("lastName", false);
        };

        const onSubmit = (e) => {
          e.preventDefault();

          let tablePayload;

          if (!values.customerId) {
            tablePayload = {
              ...table,
              customerName: values.name,
              customerLastName: values.lastName,
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
                        error={errors.name && touched.name}
                        name="name"
                        label="Nombre"
                        variant="outlined"
                        value={values.name}
                        onChange={(event) => {
                          setFieldValue("name", event.target.value);
                          setFieldValue("customerId", null);
                        }}
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
                        name="lastName"
                        label="Apellido"
                        variant="outlined"
                        value={values.lastName}
                        onChange={(event) => {
                          setFieldValue("lastName", event.target.value);
                          setFieldValue("customerId", null);
                        }}
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
                  <Grid item xs={12}>
                    <TableCustomers
                      payload={customers}
                      tableHeaders={tableHeaders}
                      tableTitle="Clientes"
                      onGetCustomerData={getCustomerData}
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
                  disabled={values.name === "" || values.lastName === ""}
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

export default withRouter(CustomersFormTables);
