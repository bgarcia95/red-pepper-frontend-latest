import {
  ADD_PRODUCT_TO_ORDER,
  REDUCE_PRODUCT_FROM_ORDER,
  REMOVE_PRODUCT_FROM_ORDER,
} from "redux/utils/actions";

const initialState = {
  orderedProducts: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_ORDER:
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

    case REDUCE_PRODUCT_FROM_ORDER:
      const selectedProduct = state.orderedProducts[action.id];
      const currentQty = selectedProduct.qty;

      let updatedOrderedProducts;

      if (currentQty > 1) {
        const updatedItem = {
          ...selectedProduct,
          qty: selectedProduct.qty - 1,
          total: selectedProduct.total - selectedProduct.unitPrice,
        };

        updatedOrderedProducts = {
          ...state.orderedProducts,
          [action.id]: updatedItem,
        };
      } else {
        updatedOrderedProducts = {
          ...state.orderedProducts,
        };
        delete updatedOrderedProducts[action.id];
      }

      return {
        ...state,
        orderedProducts: updatedOrderedProducts,
        total: state.total - selectedProduct.unitPrice,
      };

    case REMOVE_PRODUCT_FROM_ORDER:
      const productToDelete = state.orderedProducts[action.id];

      const updatedState = { ...state.orderedProducts };

      delete updatedState[action.id];

      return {
        ...state,
        orderedProducts: updatedState,
        total: state.total - productToDelete.total,
      };

    default:
      return state;
  }
};
