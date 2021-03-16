import React, { useRef } from "react";
import {
  TextField,
  FormControl,
  Grid,
  Divider,
  DialogContent,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

import { AddButton, CancelButton } from "../../UI/Buttons/Buttons";
import { addComboAction, updateComboAction } from "redux/actions/combos/combos";
import TableComboDetails from "components/Table/TableComboDetails";

const CombosForm = (props) => {
  const { toggle, payload, dishes } = props;

  const dispatch = useDispatch();

  const dishesSelect = dishes.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const filterDishPrice = (id) => {
    const filtered = dishes.find((dish) => dish.id === id);

    return filtered.price;
  };

  const filterDishName = (id) =>
    dishes.filter((dish) => dish.id === id).map((filtered) => filtered.name)[0];

  const detailsArray = payload
    ? payload.comboDetails.map((detail) => ({
        label: filterDishName(detail.dishId),
        value: detail.dishId,
      }))
    : [];

  const filteredOptions = dishesSelect.filter(
    ({ value: id1 }) => !detailsArray.some(({ value: id2 }) => id2 === id1)
  );

  const inputFileRef = useRef(null);

  return (
    <Formik
      initialValues={{
        // dish header
        name: payload ? payload.name : "",
        description: payload ? payload.description : "",
        image: "",
        fetchedImage: payload?.comboImage?.image,
        // Dish Input
        dishId: null,
        dishName: null,
        dishInputName: "",
        quantity: "",
        dishPrice: "",
        suggestedPrice: "",
        comboDetails: payload ? payload.comboDetails : [],
        dishesSelect: payload ? filteredOptions : dishesSelect,
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
            const dish = {
              comboId: payload.id,
              qty: values.quantity,
              dishId: values.dishId,
              price: values.dishPrice,
            };
            values.comboDetails = [...values.comboDetails, dish];
            setFieldValue(
              "dishesSelect",
              values.dishesSelect
                .map((dish) => dish)
                .filter((dish) => dish.value !== values.dishId)
            );
          } else {
            const dish = {
              desc: values.dishName,
              qty: values.quantity,
              dishId: values.dishId,
              price: values.dishPrice,
            };
            values.comboDetails = [...values.comboDetails, dish];
            setFieldValue(
              "dishesSelect",
              values.dishesSelect
                .map((dish) => dish)
                .filter((dish) => dish.value !== values.dishId)
            );
          }
          clearDetailHandler();
        };

        const onDeleteItem = (id) => {
          setFieldValue(
            "comboDetails",
            values.comboDetails.filter((item) => item.dishId !== id)
          );

          const deletedValue = values.comboDetails.filter(
            (item) => item.dishId === id
          )[0];

          const newOption = {
            value: deletedValue.dishId,
            label: filterDishName(deletedValue.dishId),
          };

          setFieldValue(
            "dishesSelect",
            (values.dishesSelect = [...values.dishesSelect, newOption])
          );
        };

        const onSubmit = (e) => {
          e.preventDefault();

          if (payload) {
            // const combo = {
            //   name: values.name,
            //   description: values.description,
            //   total: comboTotal,
            //   comboDetails: values.comboDetails,
            // };

            const fd = new FormData();
            fd.append("Name", values.name);
            fd.append("Description", values.description);
            fd.append("Total", comboTotal);
            fd.append("ComboDetails", JSON.stringify(values.comboDetails));
            values.image && fd.append("Image", values.image);
            fd.append("Id", payload.id);

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
                dispatch(updateComboAction(fd));
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

            // const combo = {
            //   Name: values.name,
            //   Description: values.description,
            //   Total: comboTotal,
            //   ComboDetails: details,
            // };

            const fd = new FormData();
            fd.append("Name", values.name);
            fd.append("Description", values.description);
            fd.append("Total", comboTotal);
            fd.append("ComboDetails", JSON.stringify(details));
            values.image && fd.append("Image", values.image);

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
                dispatch(addComboAction(fd));
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

        const fileSelectedHandler = (event) => {
          let reader = new FileReader();
          let file = event.target.files[0];

          reader.onloadend = () => {
            setFieldValue("image", file);
            setFieldValue("imagePreviewUrl", reader.result);
          };

          reader.readAsDataURL(file);
        };

        return (
          <React.Fragment>
            <DialogContent dividers>
              <form className="form-control">
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    {(values.imagePreviewUrl || values.fetchedImage) && (
                      <img
                        src={
                          values.imagePreviewUrl ||
                          `data:image/jpeg;base64,${values.fetchedImage}`
                        }
                        style={{
                          width: 350,
                          height: 250,
                          borderRadius: 10,
                        }}
                        alt="Preview"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        error={errors.name && touched.name}
                        name="name"
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
                        multiline
                        rows={3}
                      />
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
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
                        <div className="input-feedback">
                          {errors.description}
                        </div>
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
                        options={values.dishesSelect}
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
                            required
                            label="Platillo"
                            variant="outlined"
                            error={
                              errors.dishInputName && touched.dishInputName
                            }
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
                        required
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
                  <Grid item xs={12} md={2}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
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
                  <Grid item xs={12} md={2}>
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
                  <Grid item xs={12} md={2}>
                    <input
                      type="file"
                      name="image"
                      onChange={fileSelectedHandler}
                      style={{ display: "none" }}
                      ref={inputFileRef}
                    />
                    <button
                      onClick={() => inputFileRef.current?.click()}
                      type="button"
                    >
                      Elegir Imagen
                    </button>
                    <p>{values.image.name}</p>
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
                      filterDishName={filterDishName}
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

                {payload ? (
                  <AddButton
                    type="submit"
                    variant="contained"
                    disabled={
                      isSubmitting || !dirty || values.comboDetails.length === 0
                    }
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
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

CombosForm.propTypes = {
  payload: PropTypes.object,
  dishes: PropTypes.array,
  toggle: PropTypes.func,
};

export default CombosForm;
