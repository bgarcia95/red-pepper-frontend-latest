import {
  ADD_ORDER_SIGNALR,
  UPDATE_ORDER_SIGNALR,
  FETCH_ORDERS,
  UPDATE_ORDER_DETAILS_STATE,
} from "redux/utils/actions";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER_SIGNALR:
      return {
        orders: state.orders.concat(action.order),
      };

    case UPDATE_ORDER_SIGNALR:
      return {
        orders: state.orders.map((order) =>
          order.id === action.order.id ? (order = action.order) : order
        ),
      };

    case UPDATE_ORDER_DETAILS_STATE:
      return {
        orders: state.orders.map((order, index) => ({
          ...order,
          orderDetails: action.updatedDetails[index],
        })),
      };
    default:
      return state;
  }
};
