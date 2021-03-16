import React from "react";
import { TextField, FormControl, Grid, DialogContent } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { AddButton, CancelButton } from "components/UI/Buttons/Buttons";
import {
  updateCategoryAction,
  addCategoryAction,
} from "redux/actions/categories/categories";

const CategoriesForm = (props) => {
  const { toggle, payload } = props;
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: payload ? payload.name : "",
        description: payload ? payload.description : "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Requerido"),
        description: Yup.string().required("Requerido"),
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

          const category = {
            Name: values.name,
            Description: values.description,
          };

          if (payload) {
            dispatch(updateCategoryAction({ ...category, Id: payload.id }));
          } else {
            dispatch(addCategoryAction(category));
          }

          toggle();
        };

        return (
          <React.Fragment>
            <DialogContent dividers>
              <form className="form-control">
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        error={errors.name && touched.name}
                        name="name"
                        label="Categoría"
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
                        rows={4}
                      />
                      {errors.description && touched.description && (
                        <div className="input-feedback">
                          {errors.description}
                        </div>
                      )}
                    </FormControl>
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
                  disabled={!dirty || isSubmitting || !isValid}
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

CategoriesForm.propTypes = {
  payload: PropTypes.object,
  toggle: PropTypes.func.isRequired,
};

export default CategoriesForm;
