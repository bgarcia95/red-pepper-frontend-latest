import React, { useEffect } from "react";
import { TextField, FormControl, Grid, Divider } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddButton, CancelButton } from "../UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { getSuppliesAction } from "../../redux/actions/supplies/supplies";
import {
  addDishAction,
  updateDishAction,
  getDishesAction,
} from "../../redux/actions/dishes/dishes";
import TableDishDetails from "../../components/Table/TableDishDetails";
import Swal from "sweetalert2";
import http from "../../services/httpService";

const DishesFormik = (props) => {
  const { toggle, payload, categories } = props;
  const supplies = useSelector((state) => state.supplies.supplies);

  const dispatch = useDispatch();

  useEffect(() => {
    const getSupplies = () => dispatch(getSuppliesAction());
    getSupplies();
  }, [dispatch]);

  const suppliesSelect = supplies.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const categoriesSelect = categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const filteredCategory = (id) =>
    categories
      .filter((category) => category.id === id)
      .map((filtered) => filtered.name)[0];

  return (
    <Formik
      initialValues={{
        // dish header
        name: payload ? payload.name : "",
        categoryId: payload ? payload.dishCategoryId : null,
        categoryName: payload ? filteredCategory(payload.dishCategoryId) : null,
        categoryInputName: payload
          ? filteredCategory(payload.dishCategoryId)
          : "",
        description: payload ? payload.description : "",
        price: payload ? payload.price : "",
        // Supply input
        supplyId: null,
        supplyName: null,
        supplyInputName: "",
        quantity: "",
        expirationDate: null,
        comment: "",
        dishDetails: payload ? payload.dishSupplies : [],
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Requerido"),
        categoryInputName: Yup.string().required("Requerido"),
        description: Yup.string().required("Requerido"),
        price: Yup.number()
          .positive("El valor ingresado debe ser mayor a 0")
          .required("Requerido"),
        supplyInputName: Yup.string().required("Requerido"),
        quantity: Yup.number()
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
          setFieldValue("supplyName", null);
          setFieldValue("supplyId", null);
          setFieldValue("supplyInputName", "");
          setFieldValue("quantity", "");
          setFieldValue("comment", "");

          setFieldTouched("supplyInputName", false);
          setFieldTouched("quantity", false);
          setFieldTouched("comment", false);
        };

        const onSubmitSupply = (e) => {
          e.preventDefault();

          if (payload) {
            http
              .post("/dish/CreateDishSupply", {
                DishId: payload.id,
                Qty: values.quantity,
                SupplyId: values.supplyId,
                Comment: values.comment,
              })
              .then((response) => {
                setFieldValue(
                  "dishDetails",
                  (values.dishDetails = [...values.dishDetails, response.data])
                );
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            const supply = {
              desc: values.supplyName,
              qty: values.quantity,
              supplyId: values.supplyId,
              comment: values.comment,
            };
            values.dishDetails = [...values.dishDetails, supply];
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
                  .delete(`/dish/RemoveDishSupply/${id}`)
                  .then((response) => {
                    setFieldValue(
                      "dishDetails",
                      (values.dishDetails = [
                        ...values.dishDetails.filter(
                          (detail) => detail.id !== response.data.id
                        ),
                      ])
                    );
                    Swal.fire(
                      "Removido!",
                      "El insumo fue removido con exito.",
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
              "dishDetails",
              values.dishDetails.filter((item) => item.supplyId !== id)
            );
          }
        };

        const onSubmit = (e) => {
          e.preventDefault();

          if (payload) {
            const dish = {
              name: values.name,
              dishCategoryId: values.categoryId,
              description: values.description,
              price: values.price,
              dishSupplies: values.dishDetails,
            };
            Swal.fire({
              title: "¿Estás seguro/a?",
              text: "Se procederá con la actualización del platillo  ",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Sí, guardar!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                dispatch(updateDishAction({ ...dish, id: payload.id }));
                Swal.fire(
                  "¡Completado!",
                  "El platillo fué actualizado satisfactoriamente.",
                  "success"
                );
              }
            });
          } else {
            const details = values.dishDetails.map((detail) => ({
              Qty: detail.qty,
              SupplyId: detail.supplyId,
              Comment: detail.comment,
            }));

            const dish = {
              Name: values.name,
              DishCategoryId: values.categoryId,
              Description: values.description,
              Price: values.price,
              DishSupplies: details,
            };
            Swal.fire({
              title: "¿Estás seguro/a?",
              text: "Se procederá con el registro del platillo  ",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Sí, guardar!",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                dispatch(addDishAction(dish));
                Swal.fire(
                  "¡Completado!",
                  "El platillo fué registrado satisfactoriamente.",
                  "success"
                );
                toggle();
              }
            });
          }
        };

        return (
          <React.Fragment>
            <form className="form-control">
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth={true}>
                    <TextField
                      error={errors.name && touched.name}
                      id="name"
                      label="Nombre del Platillo"
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
                    <React.Fragment>
                      <Autocomplete
                        id="categoryInputName"
                        name="categoryInputName"
                        options={categoriesSelect}
                        getOptionLabel={(option) =>
                          typeof option === "string" ? option : option.label
                        }
                        getOptionSelected={(option, value) =>
                          value === option.label
                        }
                        value={values.categoryName}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            setFieldValue("categoryName", newValue.label);
                            setFieldValue("categoryId", newValue.value);
                            setFieldValue("categoryInputName", newValue.label);
                          }
                        }}
                        inputValue={values.categoryInputName}
                        onInputChange={(event, newInputValue, reason) => {
                          setFieldValue("categoryInputName", newInputValue);

                          if (event.target.value === "") {
                            setFieldValue("categoryInputName", "");
                            setFieldValue("categoryName", null);
                            setFieldValue("categoryId", null);
                          }
                          if (reason === "clear") {
                            setFieldValue("categoryName", null);
                            setFieldValue("categoryId", null);
                            setFieldValue("categoryInputName", "");
                          }
                        }}
                        className={
                          errors.categoryInputName && touched.categoryInputName
                            ? "text-input error"
                            : "text-input"
                        }
                        onBlur={handleBlur}
                        noOptionsText="No hay opciones"
                        clearText="Limpiar"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Categoría"
                            variant="outlined"
                            error={
                              errors.categoryInputName &&
                              touched.categoryInputName
                            }
                          />
                        )}
                      />
                      {errors.categoryInputName &&
                        touched.categoryInputName && (
                          <div className="input-feedback">
                            {errors.categoryInputName}
                          </div>
                        )}
                    </React.Fragment>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth={true}>
                    <TextField
                      id="price"
                      name="price"
                      label="Precio"
                      error={errors.price && touched.price}
                      variant="outlined"
                      type="number"
                      inputProps={{ min: "1", step: "1" }}
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.price && touched.price
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.price && touched.price && (
                      <div className="input-feedback">{errors.price}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
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

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12} md={4}>
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
                      error={errors.comment && touched.comment}
                      name="comment"
                      label="Comentario"
                      variant="outlined"
                      value={values.comment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.comment && touched.comment
                          ? "text-input error"
                          : "text-input"
                      }
                      multiline
                      rows={3}
                    />
                    {errors.comment && touched.comment && (
                      <div className="input-feedback">{errors.comment}</div>
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
                    disabled={!values.supplyName || values.quantity <= 0}
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
                  <TableDishDetails
                    supplies={supplies}
                    onDeleteItem={onDeleteItem}
                    dishDetails={values.dishDetails}
                    fetchedDetails={payload ? payload.dishSupplies : null}
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
                        payload.dishSupplies !== values.dishDetails
                      ) {
                        dispatch(getDishesAction());
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
                        !values.categoryName ||
                        !values.description ||
                        values.price <= 0 ||
                        values.dishDetails.length === 0
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

export default DishesFormik;
