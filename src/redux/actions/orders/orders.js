import {
  ADD_PRODUCT_TO_ORDER_START,
  ADD_PRODUCT_TO_ORDER_SUCCESS,
  ADD_PRODUCT_TO_ORDER_ERROR,
} from "redux/utils/actions";

export const addProductToOrderStart = () => ({
  type: ADD_PRODUCT_TO_ORDER_START,
});

export const addProductToOrderSuccess = (product) => ({
  type: ADD_PRODUCT_TO_ORDER_SUCCESS,
  product,
});

export const addProductToOrderError = () => ({
  type: ADD_PRODUCT_TO_ORDER_ERROR,
});
