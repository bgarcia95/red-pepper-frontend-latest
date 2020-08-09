import http from "services/httpService";
import {
  ADD_ORDER_SIGNALR,
  UPDATE_ORDER_SIGNALR,
  FETCH_ORDERS,
} from "redux/utils/actions";

export const fetchOrders = () => {
  return async (dispatch) => {
    http.get("/order").then((response) => {
      dispatch({ type: FETCH_ORDERS, orders: response.data });
    });
  };
};

export const addOrderSignalR = (order) => ({
  type: ADD_ORDER_SIGNALR,
  order,
});

export const updateOrderSignalR = (order) => ({
  type: UPDATE_ORDER_SIGNALR,
  order,
});
