import http from "../../../services/httpService";
import {
  GET_DISHES_START,
  GET_DISHES_SUCCESS,
  GET_DISHES_ERROR,
  ADD_DISH_START,
  ADD_DISH_ERROR,
  ADD_DISH_SUCCESS,
  UPDATE_DISH_START,
  UPDATE_DISH_SUCCESS,
  UPDATE_DISH_ERROR,
  DELETE_DISH_START,
  DELETE_DISH_SUCCESS,
  DELETE_DISH_ERROR,
} from "../../utils/actions";

// All GET methods
export const getDishesStart = () => ({
  type: GET_DISHES_START,
});

export const getDishesSuccess = (dishes) => ({
  type: GET_DISHES_SUCCESS,
  dishes,
});

export const getDishesError = () => ({
  type: GET_DISHES_ERROR,
});

export const getDishesAction = () => {
  return (dispatch) => {
    dispatch(getDishesStart());

    // Retrieve data from API
    http
      .get("/dish")
      .then((response) => {
        // console.log(response);
        dispatch(getDishesSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getDishesError());
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

        dispatch(getDishesAction());
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
        dispatch(getDishesAction());
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
        dispatch(getDishesAction());
      })
      .catch((error) => {
        dispatch(deleteDishError(error));
      });
  };
};
