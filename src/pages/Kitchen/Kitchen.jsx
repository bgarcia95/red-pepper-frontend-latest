import React, { useEffect, useCallback } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Typography, Divider } from "@material-ui/core";
import { getCombosAction } from "redux/actions/combos/combos";
import { getDishesAction } from "redux/actions/dishes/dishes";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import {
  fetchOrders,
  addOrderSignalR,
  updateOrderSignalR,
} from "redux/actions/signalR/signalROrders";

const Kitchen = (props) => {
  const columns = [
    { title: "En Cola", status: "En Cola" },
    { title: "En Proceso", status: "En Proceso" },
    { title: "Finalizado", status: "Finalizado" },
  ];
  const combos = useSelector((state) => state.combos.combos);
  const dishes = useSelector((state) => state.dishes.dishes);
  const orders = useSelector((state) => state.signalROrders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCombos = () => dispatch(getCombosAction());
    const loadDishes = () => dispatch(getDishesAction());
    const loadOrders = () => dispatch(fetchOrders());
    loadCombos();
    loadDishes();
    loadOrders();
  }, [dispatch]);

  const testingNewData = useCallback(
    (details) => {
      const currentDetails = orders.map((order) => {
        return order.orderDetails.map((detail) => detail);
      });

      const finalDetails = details.map((detail) => {
        const newArray = currentDetails.map((detArray) => {
          return detArray.map((curDet) =>
            curDet.id === detail.id ? (curDet = detail) : curDet
          );
        });

        return newArray;
      });

      // const finalDetailsAlt = orders.map((order) => {
      //   return order.orderDetails.map((detail) => {
      //     return details.map((fetchedDetail) =>
      //       detail.id === fetchedDetail.id ? (detail = fetchedDetail) : detail
      //     );
      //   });
      // });

      // console.log("Current Details", currentDetails);
      console.log("Final Details", finalDetails);
      // console.log("Final Details Alt", finalDetailsAlt);
    },
    [orders]
  );

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/redpeper/app")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then((result) => {
        console.log("Connected!");

        connection.on("OrderCreated", (order) => {
          console.log("Added Order", order);

          dispatch(addOrderSignalR(order));
        });

        connection.on("DetailsUpdated", (order) => {
          console.log("Updated Order", order);

          dispatch(updateOrderSignalR(order));
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, [dispatch]);

  useEffect(() => {
    console.log("Updated Details");
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/redpeper/app")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then((result) => {
        connection.on("DetailsInProcess", (details) => {
          console.log("Updated Details", details);

          testingNewData(details);
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, [testingNewData]);

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Kitchen Screen!
      </Typography>

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {columns.map((column, index) => (
          <div
            style={{
              display: "flex",
            }}
            key={index}
          >
            <Column
              column={column}
              tasks={orders}
              combos={combos}
              dishes={dishes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kitchen;
