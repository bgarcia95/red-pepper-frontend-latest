import {
  ADD_PRODUCT_TO_ORDER,
  REDUCE_PRODUCT_FROM_ORDER,
  REMOVE_PRODUCT_FROM_ORDER,
} from "redux/utils/actions";

export const addProductToOrder = (product) => ({
  type: ADD_PRODUCT_TO_ORDER,
  product,
});

export const reduceProductFromOrder = (id) => ({
  type: REDUCE_PRODUCT_FROM_ORDER,
  id,
});

export const removeProductFromOrder = (id) => ({
  type: REMOVE_PRODUCT_FROM_ORDER,
  id,
});
