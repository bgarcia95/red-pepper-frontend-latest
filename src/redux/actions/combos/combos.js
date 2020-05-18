import http from "../../../services/httpService";
import {
  GET_COMBOS_START,
  GET_COMBOS_SUCCESS,
  GET_COMBOS_ERROR,
  ADD_COMBO_START,
  ADD_COMBO_ERROR,
  ADD_COMBO_SUCCESS,
  UPDATE_COMBO_START,
  UPDATE_COMBO_SUCCESS,
  UPDATE_COMBO_ERROR,
  DELETE_COMBO_START,
  DELETE_COMBO_SUCCESS,
  DELETE_COMBO_ERROR,
} from "../../utils/actions";

// All GET methods
export const getCombosStart = () => ({
  type: GET_COMBOS_START,
});

export const getCombosSuccess = (combos) => ({
  type: GET_COMBOS_SUCCESS,
  combos,
});

export const getCombosError = () => ({
  type: GET_COMBOS_ERROR,
});

export const getCombosAction = () => {
  return (dispatch) => {
    dispatch(getCombosStart());

    // Retrieve data from API
    // TODO: update API Endpoint
    http
      .get("/dish")
      .then((response) => {
        // console.log(response);
        dispatch(getCombosSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getCombosError());
      });
  };
};

// ALL POST METHODS

export const addDishStart = () => ({
  type: ADD_DISH_START,
});

export const addDishSuccess = (dish) => ({
  type: ADD_DISH_SUCCESS,
  dish,
});

export const addDishError = (error) => ({
  type: ADD_DISH_ERROR,
  error,
});

export const addDishAction = (dish) => {
  return (dispatch) => {
    dispatch(addDishStart());

    // Insert into db
    http
      .post("/dish/CreateDish", dish)
      .then((response) => {
        dispatch(addDishSuccess(response.data));

        dispatch(getCombosAction());
      })
      .catch((error) => {
        dispatch(addDishError(error));
      });
  };
};

// ALL PUT (PATCH) METHODS

export const updateDishStart = () => ({
  type: UPDATE_DISH_START,
});

export const updateDishSuccess = (dish) => ({
  type: UPDATE_DISH_SUCCESS,
  dish,
});

export const updateDishError = (error) => ({
  type: UPDATE_DISH_ERROR,
  error,
});

export const updateDishAction = (dish) => {
  return (dispatch) => {
    dispatch(updateDishStart());

    http
      .put("/dish/UpdateDish", dish)
      .then((response) => {
        dispatch(updateDishSuccess(response.data));
        dispatch(getCombosAction());
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateDishError(error));
      });
  };
};

// ALL DELETE METHODS

export const deleteDishStart = () => ({
  type: DELETE_DISH_START,
});

export const deleteDishSuccess = (id) => ({
  type: DELETE_DISH_SUCCESS,
  id,
});

export const deleteDishError = (error) => ({
  type: DELETE_DISH_ERROR,
  error,
});
export const deleteDishAction = (id) => {
  return (dispatch) => {
    http
      .delete(`/dish/RemoveDish/${id}`)
      .then((response) => {
        dispatch(deleteDishSuccess(response.data.id));
        dispatch(getCombosAction());
      })
      .catch((error) => {
        dispatch(deleteDishError(error));
      });
  };
};
