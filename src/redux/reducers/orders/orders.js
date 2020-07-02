import {
  ADD_PRODUCT_TO_ORDER_START,
  ADD_PRODUCT_TO_ORDER_SUCCESS,
} from "redux/utils/actions";

const initialState = {
  orderedProducts: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_ORDER_START:
      return {
        ...state,
      };
    case ADD_PRODUCT_TO_ORDER_SUCCESS:
      const addedProduct = action.product;

      let newOrUpdatedOrderProduct;
      if (state.orderedProducts[addedProduct.id]) {
        newOrUpdatedOrderProduct = {
          dishId: addedProduct.dishId || null,
          comboId: addedProduct.comboId || null,
          //   discount: addedProduct.discount || 0,
          qty: state.orderedProducts[addedProduct.id].qty + 1,
          title: addedProduct.title,
          unitPrice: addedProduct.unitPrice,
          total:
            state.orderedProducts[addedProduct.id].total +
            addedProduct.unitPrice,
        };
      } else {
        newOrUpdatedOrderProduct = {
          dishId: addedProduct.dishId || null,
          comboId: addedProduct.comboId || null,
          title: addedProduct.title,

          //   discount: addedProduct.discount || 0,
          qty: 1,
          unitPrice: addedProduct.unitPrice,
          total: addedProduct.unitPrice,
        };
      }

      return {
        ...state,
        orderedProducts: {
          ...state.orderedProducts,
          [addedProduct.id]: newOrUpdatedOrderProduct,
        },
        total: state.total + addedProduct.unitPrice,
      };

    default:
      return state;
  }
};
