import React, { useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { getCombosAction } from "redux/actions/combos/combos";
import { getDishesAction } from "redux/actions/dishes/dishes";
import { useSelector, useDispatch } from "react-redux";

const Kitchen = (props) => {
  const [orders, setOrders] = useState([]);
  const latestOrder = useRef(null);
  const combos = useSelector((state) => state.combos.combos);
  const dishes = useSelector((state) => state.dishes.dishes);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCombos = () => dispatch(getCombosAction());
    const loadDishes = () => dispatch(getDishesAction());
    loadCombos();
    loadDishes();
  }, [dispatch]);

  const getDishName = (dId) => {
    if (dId === null) {
      return;
    }

    return dishes.find((dish) => dish.id === dId).name;
  };

  const getComboName = (cId) => {
    if (cId === null) {
      return;
    }
    return combos.find((combo) => combo.id === cId).name;
  };

  latestOrder.current = orders;

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
          const updatedOrder = [...latestOrder.current];
          updatedOrder.push(order);

          setOrders(updatedOrder);
        });

        connection.on("DetailsUpdated", (order) => {
          console.log("Updated Order", order);
          const updatedOrder = [...latestOrder.current];
          updatedOrder.push(order);

          setOrders(updatedOrder);
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Kitchen Screen!
      </Typography>
    </div>
  );
};

export default Kitchen;
