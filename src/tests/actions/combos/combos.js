import http from "services/httpService";
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
} from "redux/utils/actions";

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
    http
      .get("/Combo")
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

export const addComboStart = () => ({
  type: ADD_COMBO_START,
});

export const addComboSuccess = (combo) => ({
  type: ADD_COMBO_SUCCESS,
  combo,
});

export const addComboError = (error) => ({
  type: ADD_COMBO_ERROR,
  error,
});

export const addComboAction = (combo) => {
  return (dispatch) => {
    dispatch(addComboStart());

    // Insert into db
    http
      .post("/combo/CreateCombo", combo)
      .then((response) => {
        dispatch(addComboSuccess(response.data));

        dispatch(getCombosAction());
      })
      .catch((error) => {
        dispatch(addComboError(error));
      });
  };
};

// ALL PUT (PATCH) METHODS

export const updateComboStart = () => ({
  type: UPDATE_COMBO_START,
});

export const updateComboSuccess = (combo) => ({
  type: UPDATE_COMBO_SUCCESS,
  combo,
});

export const updateComboError = (error) => ({
  type: UPDATE_COMBO_ERROR,
  error,
});

export const updateComboAction = (combo) => {
  return (dispatch) => {
    dispatch(updateComboStart());

    http
      .put("/combo/UpdateCombo", combo)
      .then((response) => {
        dispatch(updateComboSuccess(response.data));
        dispatch(getCombosAction());
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateComboError(error));
      });
  };
};

// ALL DELETE METHODS

export const deleteComboStart = () => ({
  type: DELETE_COMBO_START,
});

export const deleteComboSuccess = (id) => ({
  type: DELETE_COMBO_SUCCESS,
  id,
});

export const deleteComboError = (error) => ({
  type: DELETE_COMBO_ERROR,
  error,
});
export const deleteComboAction = (id) => {
  return (dispatch) => {
    http
      .delete(`/combo/RemoveCombo/${id}`)
      .then((response) => {
        dispatch(deleteComboSuccess(response.data.id));
        dispatch(getCombosAction());
      })
      .catch((error) => {
        dispatch(deleteComboError(error));
      });
  };
};
