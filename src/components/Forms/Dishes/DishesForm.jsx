import React from "react";
import {
  TextField,
  FormControl,
  Grid,
  Divider,
  DialogContent,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddButton, CancelButton } from "../../UI/Buttons/Buttons";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addDishAction, updateDishAction } from "redux/actions/dishes/dishes";
import TableDishDetails from "components/Table/TableDishDetails";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const DishesForm = (props) => {
  const { toggle, payload, categories, supplies } = props;

  const dispatch = useDispatch();

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

  const filterSupplyName = (id) =>
    supplies
      .filter((supply) => supply.id === id)
      .map((filtered) => filtered.name)[0];

  const detailsArray = payload
    ? payload.dishSupplies.map((detail) => ({
        label: filterSupplyName(detail.supplyId),
        value: detail.supplyId,
      }))
    : [];

  const filteredOptions = suppliesSelect.filter(
    ({ value: id1 }) => !detailsArray.some(({ value: id2 }) => id2 === id1)
  );

  // const inputFileRef = useRef(null);

  return (
    <Formik
      initialValues={{
        // Dish header
        name: payload ? payload.name : "",
        categoryId: payload ? payload.dishCategoryId : null,
        categoryName: payload ? filteredCategory(payload.dishCategoryId) : null,
        categoryInputName: payload
          ? filteredCategory(payload.dishCategoryId)
          : "",
        description: payload ? payload.description : "",
        image: "",
        fetchedImage: payload?.dishImage?.image,
        imagePreviewUrl: "",
        price: payload ? payload.price : "",
        // Supply input
        supplyId: null,
        supplyName: null,
        supplyInputName: "",
        quantity: "",
        expirationDate: null,
        comment: "",
        dishDetails: payload ? payload.dishSupplies : [],

        suppliesSelect: payload ? filteredOptions : suppliesSelect,
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
            const supply = {
              dishId: payload.id,
              qty: values.quantity,
              supplyId: values.supplyId,
              comment: values.comment,
            };
            values.dishDetails = [...values.dishDetails, supply];
            setFieldValue(
              "suppliesSelect",
              values.suppliesSelect
                .map((supply) => supply)
                .filter((supply) => supply.value !== values.supplyId)
            );
          } else {
            const supply = {
              desc: values.supplyName,
              qty: values.quantity,
              supplyId: values.supplyId,
              comment: values.comment,
            };
            values.dishDetails = [...values.dishDetails, supply];
            setFieldValue(
              "suppliesSelect",
              values.suppliesSelect
                .map((supply) => supply)
                .filter((supply) => supply.value !== values.supplyId)
            );
          }

          clearDetailHandler();
        };

        const onDeleteItem = (id) => {
          setFieldValue(
            "dishDetails",
            values.dishDetails.filter((item) => item.supplyId !== id)
          );

          const deletedValue = values.dishDetails.filter(
            (item) => item.supplyId === id
          )[0];

          const newOption = {
            value: deletedValue.supplyId,
            label: filterSupplyName(deletedValue.supplyId),
          };

          setFieldValue(
            "suppliesSelect",
            (values.suppliesSelect = [...values.suppliesSelect, newOption])
          );
        };

        const onSubmit = (e) => {
          e.preventDefault();

          // console.log(fd.get(''));

          // const fd = new FormData();
          // values.image && fd.append("image", values.image);

          // console.log(fd.get("image"));

          if (payload) {
            // const dish = {
            //   name: values.name,
            //   dishCategoryId: values.categoryId,
            //   description: values.description,
            //   price: values.price,
            //   dishSupplies: values.dishDetails,
            //   image: values.image,
            // };
            // console.log(dish);

            const fd = new FormData();
            fd.append("name", values.name);
            fd.append("dishCategoryId", values.categoryId);
            fd.append("description", values.description);
            fd.append("price", values.price);
            fd.append("dishSupplies", JSON.stringify(values.dishDetails));
            values.image && fd.append("image", values.image);
            fd.append("id", payload.id);

            // console.log(fd.get("name"));
            // console.log(fd.get("dishCategoryId"));
            // console.log(fd.get("description"));
            // console.log(fd.get("price"));
            // console.log(fd.get("dishSupplies"));
            // console.log(fd.get("image"));

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
                dispatch(
                  updateDishAction(fd /* { ...dish, id: payload.id } */)
                );
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

            const fd = new FormData();
            fd.append("name", values.name);
            fd.append("dishCategoryId", values.categoryId);
            fd.append("description", values.description);
            fd.append("price", values.price);
            fd.append("dishSupplies", JSON.stringify(details));
            values.image && fd.append("image", values.image);

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
                dispatch(addDishAction(fd));
                Swal.fire(
                  "¡Completado!",
                  "El platillo fué registrado satisfactoriamente.",
                  "success"
                );
                toggle();
              }
            });
            // console.log(dish);
          }
        };

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
              <form className='form-control'>
                <Grid container alignItems='flex-start' spacing={2}>
                  <Grid item xs={12} md={5}>
                    <FormControl fullWidth={true}>
                      <TextField
                        error={errors.name && touched.name}
                        name='name'
                        label='Nombre del Platillo'
                        variant='outlined'
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
                        <div className='input-feedback'>{errors.name}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth={true}>
                      <React.Fragment>
                        <Autocomplete
                          id='categoryInputName'
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
                              setFieldValue(
                                "categoryInputName",
                                newValue.label
                              );
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
                            errors.categoryInputName &&
                            touched.categoryInputName
                              ? "text-input error"
                              : "text-input"
                          }
                          onBlur={handleBlur}
                          noOptionsText='No hay opciones'
                          clearText='Limpiar'
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label='Categoría'
                              variant='outlined'
                              error={
                                errors.categoryInputName &&
                                touched.categoryInputName
                              }
                            />
                          )}
                        />
                        {errors.categoryInputName &&
                          touched.categoryInputName && (
                            <div className='input-feedback'>
                              {errors.categoryInputName}
                            </div>
                          )}
                      </React.Fragment>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth={true}>
                      <TextField
                        name='price'
                        label='Precio'
                        error={errors.price && touched.price}
                        variant='outlined'
                        type='number'
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
                        <div className='input-feedback'>{errors.price}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth={true}>
                      <TextField
                        error={errors.description && touched.description}
                        name='description'
                        label='Descripción'
                        variant='outlined'
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
                        <div className='input-feedback'>
                          {errors.description}
                        </div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth={true}>
                      <input
                        type='file'
                        name='image'
                        onChange={fileSelectedHandler}
                        // style={{ display: "none" }}
                        // ref={inputFileRef}
                      />
                      {/* <button onClick={() => inputFileRef.current?.click()}>
                        Elegir Imagen
                      </button> */}
                    </FormControl>
                  </Grid>

                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      {(values.imagePreviewUrl || values.fetchedImage) && (
                        <img
                          src={
                            values.imagePreviewUrl ||
                            `data:image/jpeg;base64,${values.fetchedImage}`
                          }
                          style={{
                            width: "100%",
                            height: 100,
                            objectFit: "contain",
                          }}
                          alt='Preview'
                        />
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth={true}>
                      <Autocomplete
                        id='supplyInputName'
                        options={values.suppliesSelect}
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
                        noOptionsText='No hay opciones'
                        clearText='Limpiar'
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Insumo'
                            variant='outlined'
                            error={
                              errors.supplyInputName && touched.supplyInputName
                            }
                          />
                        )}
                      />
                      {errors.supplyInputName && touched.supplyInputName && (
                        <div className='input-feedback'>
                          {errors.supplyInputName}
                        </div>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth={true}>
                      <TextField
                        name='quantity'
                        label='Cantidad'
                        error={errors.quantity && touched.quantity}
                        variant='outlined'
                        type='number'
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
                        <div className='input-feedback'>{errors.quantity}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth={true}>
                      <TextField
                        error={errors.comment && touched.comment}
                        name='comment'
                        label='Comentario'
                        variant='outlined'
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
                        <div className='input-feedback'>{errors.comment}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={2}
                    className='text-center'
                    style={{ marginTop: "5px" }}
                  >
                    <AddButton
                      disabled={!values.supplyName || values.quantity <= 0}
                      variant='contained'
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
                      filterSupplyName={filterSupplyName}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <div className='center-content'>
                <CancelButton onClick={toggle} variant='contained'>
                  Cancelar
                </CancelButton>

                {payload ? (
                  <AddButton
                    type='submit'
                    variant='contained'
                    disabled={
                      isSubmitting || !dirty || values.dishDetails.length === 0
                    }
                    onClick={(e) => onSubmit(e)}
                  >
                    Confirmar
                  </AddButton>
                ) : (
                  <AddButton
                    type='submit'
                    variant='contained'
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
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

DishesForm.propTypes = {
  payload: PropTypes.object,
  categories: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default DishesForm;
