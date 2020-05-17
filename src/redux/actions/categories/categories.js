import http from "../../../services/httpService";
import {
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  ADD_CATEGORY_START,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_ERROR,
  UPDATE_CATEGORY_START,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  DELETE_CATEGORY_START,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
} from "../../utils/actions";
import Swal from "sweetalert2";

// All GET methods
export const getCategoriesStart = () => ({
  type: GET_CATEGORIES_START,
});

export const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  categories,
});

export const getCategoriesError = (error) => ({
  type: GET_CATEGORIES_ERROR,
  error,
});

export const getCategoriesAction = () => {
  return (dispatch) => {
    dispatch(getCategoriesStart());

    // Retrieve data from API
    http
      .get("/DishCategory")
      .then((response) => {
        dispatch(getCategoriesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getCategoriesError(error));
      });
  };
};

// ALL POST METHODS

export const addCategoryStart = () => ({
  type: ADD_CATEGORY_START,
});

export const addCategorySuccess = (category) => ({
  type: ADD_CATEGORY_SUCCESS,
  category,
});

export const addCategoryError = (error) => ({
  type: ADD_CATEGORY_ERROR,
  error,
});

export const addCategoryAction = (category) => {
  return (dispatch) => {
    dispatch(addCategoryStart());

    // Insert into db
    http
      .post("/DishCategory", category)
      .then((response) => {
        dispatch(addCategorySuccess(response.data));
        Swal.fire(
          "¡Guardado!",
          "La categoría fue guardada satisfactoriamente",
          "success"
        );
        dispatch(getCategoriesAction());
      })
      .catch((error) => {
        dispatch(addCategoryError(error));
      });
  };
};

// ALL PUT (PATCH) METHODS

export const updateCategoryStart = () => ({
  type: UPDATE_CATEGORY_START,
});

export const updateCategorySuccess = (category) => ({
  type: UPDATE_CATEGORY_SUCCESS,
  category,
});

export const updateCategoryError = (error) => ({
  type: UPDATE_CATEGORY_ERROR,
  error,
});

export const updateCategoryAction = (category) => {
  return (dispatch) => {
    dispatch(updateCategoryStart());

    http
      .put("/DishCategory", category)
      .then((response) => {
        dispatch(updateCategorySuccess(response.data));
        Swal.fire(
          "¡Guardado!",
          "La categoría fue actualizada satisfactoriamente",
          "success"
        );
        dispatch(getCategoriesAction());
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateCategoryError(error));
      });
  };
};

// ALL DELETE METHODS

export const deleteCategoryStart = () => ({
  type: DELETE_CATEGORY_START,
});

export const deleteCategorySuccess = (id) => ({
  type: DELETE_CATEGORY_SUCCESS,
  id,
});

export const deleteCategoryError = (error) => ({
  type: DELETE_CATEGORY_ERROR,
  error,
});
export const deleteCategoryAction = (id) => {
  return (dispatch) => {
    http
      .delete(`/DishCategory/${id}`)
      .then((response) => {
        dispatch(deleteCategorySuccess(response.data.id));
        dispatch(getCategoriesAction());
      })
      .catch((error) => {
        dispatch(deleteCategoryError(error));
      });
  };
};
