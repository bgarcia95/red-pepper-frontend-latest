import React, { useEffect } from "react";
import { TextField, FormControl, Grid, Divider } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddButton, CancelButton } from "../UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import http from "services/httpService";
import TableComboDetails from "components/Table/TableComboDetails";
import { getDishesAction } from "redux/actions/dishes/dishes";
import {
  addComboAction,
  updateComboAction,
  getCombosAction,
} from "redux/actions/combos/combos";

const CombosForm = (props) => {
  const { toggle, payload } = props;
  const dishes = useSelector((state) => state.dishes.dishes);

  const dispatch = useDispatch();

  useEffect(() => {
    const getDishes = () => dispatch(getDishesAction());
    getDishes();
  }, [dispatch]);

  const dishesSelect = dishes.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const filterDishPrice = (id) => {
    const filtered = dishes
      .filter((dish) => dish.id === id)
      .map((filtered) => filtered.price)[0];

    return filtered;
  };

  return (
    <Formik
      initialValues={{
        // dish header
        name: payload ? payload.name : "",
        description: payload ? payload.description : "",
        // Dish Input
        dishId: null,
        dishName: null,
        dishInputName: "",
        quantity: "",
        dishPrice: "",
        suggestedPrice: "",
        comboDetails: payload ? payload.comboDetails : [],
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Requerido"),
        description: Yup.string().required("Requerido"),
        dishInputName: Yup.string().required("Requerido"),
        quantity: Yup.number()
          .positive("El valor ingresado debe ser mayor a 0")
          .required("Requerido"),
        dishPrice: Yup.number()
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
          isSubmitting,
          dirty,
        } = props;

        const clearDetailHandler = () => {
          setFieldValue("dishName", null);
          setFieldValue("dishId", null);
          setFieldValue("dishInputName", "");
          setFieldValue("quantity", "");
          setFieldValue("dishPrice", "");

          setFieldTouched("dishInputName", false);
          setFieldTouched("quantity", false);
          setFieldTouched("dishPrice", false);
        };

        const onSubmitDish = (e) => {
          e.preventDefault();

          if (payload) {
            http
              .post("/combo/CreateComboDetail", {
                comboId: payload.id,
                qty: values.quantity,
                dishId: values.dishId,
                price: values.dishPrice,
              })
              .then((response) => {
                setFieldValue(
                  "comboDetails",
                  (values.comboDetails = [
                    ...values.comboDetails,
                    response.data,
                  ])
                );
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            const dish = {
              desc: values.dishName,
              qty: values.quantity,
              dishId: values.dishId,
              price: values.dishPrice,
            };
            values.comboDetails = [...values.comboDetails, dish];
          }
          clearDetailHandler();
        };

        const onDeleteItem = (id) => {
          if (payload) {
            Swal.fire({
              title: "¿Estás seguro/a?",
              text: "Se procederá con la eliminacion del detalle",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Sí, remover!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                http
                  .delete(`/combo/RemoveComboDetail/${id}`)
                  .then((response) => {
                    setFieldValue(
                      "comboDetails",
                      (values.comboDetails = [
                        ...values.comboDetails.filter(
                          (detail) => detail.id !== response.data.id
                        ),
                      ])
                    );
                    Swal.fire(
                      "Removido!",
                      "El platillo fue removido con exito.",
                      "success"
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            });
          } else {
            setFieldValue(
              "comboDetails",
              values.comboDetails.filter((item) => item.dishId !== id)
            );
          }
        };

        const onSubmit = (e) => {
          e.preventDefault();

          if (payload) {
            const combo = {
              name: values.name,
              description: values.description,
              total: comboTotal,
              comboDetails: values.comboDetails,
            };
            Swal.fire({
              title: "¿Estás seguro/a?",
              text: "Se procederá con la actualización del combo",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Sí, guardar!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                dispatch(updateComboAction({ ...combo, id: payload.id }));
                Swal.fire(
                  "¡Completado!",
                  "El combo fué actualizado satisfactoriamente.",
                  "success"
                );
              }
            });
          } else {
            const details = values.comboDetails.map((detail) => ({
              Qty: detail.qty,
              DishId: detail.dishId,
              Price: detail.price,
            }));

            const combo = {
              Name: values.name,
              Description: values.description,
              Total: comboTotal,
              ComboDetails: details,
            };
            Swal.fire({
              title: "¿Estás seguro/a?",
              text: "Se procederá con el registro del combo  ",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Sí, guardar!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                dispatch(addComboAction(combo));
                Swal.fire(
                  "¡Completado!",
                  "El combo fué registrado satisfactoriamente.",
                  "success"
                );
                toggle();
              }
            });
          }
        };

        const total = (items) => {
          return items
            .map(({ price, qty }) => price * qty)
            .reduce((sum, i) => sum + i, 0);
        };

        const comboTotal = total(values.comboDetails);

        return (
          <React.Fragment>
            <form className="form-control">
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={5}>
                  <FormControl fullWidth={true}>
                    <TextField
                      error={errors.name && touched.name}
                      id="name"
                      label="Nombre del Combo"
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
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth={true}>
                    <TextField
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
                      <div className="input-feedback">{errors.description}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth={true}>
                    <TextField
                      label="Total"
                      variant="outlined"
                      disabled
                      value={comboTotal}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth={true}>
                    <Autocomplete
                      id="dishInputName"
                      name="dishInputName"
                      options={dishesSelect}
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.label
                      }
                      getOptionSelected={(option, value) =>
                        value === option.label
                      }
                      value={values.dishName}
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          setFieldValue("dishName", newValue.label);
                          setFieldValue("dishId", newValue.value);
                          setFieldValue("dishInputName", newValue.label);
                        }
                      }}
                      inputValue={values.dishInputName}
                      onInputChange={(event, newInputValue, reason) => {
                        setFieldValue("dishInputName", newInputValue);

                        if (event.target.value === "") {
                          setFieldValue("dishInputName", "");
                          setFieldValue("dishName", null);
                          setFieldValue("dishId", null);
                        }
                        if (reason === "clear") {
                          setFieldValue("dishName", null);
                          setFieldValue("dishId", null);
                          setFieldValue("dishInputName", "");
                        }
                      }}
                      className={
                        errors.dishInputName && touched.dishInputName
                          ? "text-input error"
                          : "text-input"
                      }
                      onBlur={handleBlur}
                      noOptionsText="No hay opciones"
                      clearText="Limpiar"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Platillo"
                          variant="outlined"
                          error={errors.dishInputName && touched.dishInputName}
                        />
                      )}
                    />
                    {errors.dishInputName && touched.dishInputName && (
                      <div className="input-feedback">
                        {errors.dishInputName}
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
                    />
                    {errors.quantity && touched.quantity && (
                      <div className="input-feedback">{errors.quantity}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth={true}>
                    <TextField
                      id="dishPrice"
                      name="dishPrice"
                      label="Precio Combo"
                      error={errors.dishPrice && touched.dishPrice}
                      variant="outlined"
                      type="number"
                      inputProps={{ min: "1", step: "1" }}
                      value={values.dishPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.dishPrice && touched.dishPrice
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.dishPrice && touched.dishPrice && (
                      <div className="input-feedback">{errors.dishPrice}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth={true}>
                    <TextField
                      label="Precio Original"
                      variant="outlined"
                      value={
                        values.dishId ? filterDishPrice(values.dishId) : ""
                      }
                      disabled
                    />
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="text-center"
                  style={{ marginTop: "5px" }}
                >
                  <AddButton
                    disabled={
                      !values.dishName ||
                      values.quantity <= 0 ||
                      values.dishPrice <= 0
                    }
                    variant="contained"
                    onClick={(e) => {
                      onSubmitDish(e);
                    }}
                  >
                    Agregar Detalle
                  </AddButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <TableComboDetails
                    comboDetails={values.comboDetails}
                    onDeleteItem={onDeleteItem}
                    dishes={dishes}
                    fetchedDetails={payload ? payload.comboDetails : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
              <DialogActions>
                <div className="center-content">
                  <CancelButton
                    onClick={() => {
                      toggle();
                      if (
                        payload &&
                        payload.comboDetails !== values.comboDetails
                      ) {
                        dispatch(getCombosAction());
                      }
                    }}
                    variant="contained"
                  >
                    Cancelar
                  </CancelButton>

                  {payload ? (
                    <AddButton
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting || !dirty}
                      onClick={(e) => onSubmit(e)}
                    >
                      Confirmar
                    </AddButton>
                  ) : (
                    <AddButton
                      type="submit"
                      variant="contained"
                      disabled={
                        !values.name ||
                        !values.description ||
                        values.comboDetails.length === 0
                      }
                      onClick={(e) => onSubmit(e)}
                    >
                      Confirmar
                    </AddButton>
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

export default CombosForm;
