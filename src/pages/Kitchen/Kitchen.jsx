import React, { useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState } from "react";
import { Typography, Divider } from "@material-ui/core";
import { getCombosAction } from "redux/actions/combos/combos";
import { getDishesAction } from "redux/actions/dishes/dishes";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";

const Kitchen = (props) => {
  const [orders, setOrders] = useState([]);
  const columns = [
    { title: "En Cola", status: "En Cola" },
    { title: "En Proceso", status: "En Proceso" },
    { title: "Finalizado", status: "Finalizado" },
  ];
  const combos = useSelector((state) => state.combos.combos);
  const dishes = useSelector((state) => state.dishes.dishes);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCombos = () => dispatch(getCombosAction());
    const loadDishes = () => dispatch(getDishesAction());
    loadCombos();
    loadDishes();
  }, [dispatch]);

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

          setOrders((prevState) => prevState.concat(order));
        });

        connection.on("DetailsUpdated", (order) => {
          console.log("Updated Order", order);

          setOrders((prevState) =>
            prevState.map((or) => (or.id === order.id ? (or = order) : or))
          );
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);

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
