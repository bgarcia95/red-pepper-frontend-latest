import http from "services/httpService";
import {
	ADD_ORDER_SIGNALR,
	UPDATE_ORDER_SIGNALR,
	FETCH_ORDERS,
	UPDATE_ORDER_DETAILS_STATE,
} from "redux/utils/actions";

export const fetchOrders = () => {
	return (dispatch) => {
		http.get("/order").then((response) => {
			dispatch({ type: FETCH_ORDERS, orders: response.data });
		});
	};
};

export const fetchOrdersKitchen = () => {
	return (dispatch) => {
		http.get("http://localhost:5000/api/Kitchen").then((response) => {
			dispatch({ type: FETCH_ORDERS, orders: response.data });
		});
	};
}

export const addOrderSignalR = (order) => ({
	type: ADD_ORDER_SIGNALR,
	order,
});

export const updateOrderSignalR = (order) => ({
	type: UPDATE_ORDER_SIGNALR,
	order,
});

export const updateOrderDetailsSignalR = (updatedDetails) => {

	return  async dispatch => {
		dispatch({
			type: UPDATE_ORDER_DETAILS_STATE,
			updatedDetails,
		})
	}
};
