import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import TabletIcon from "@material-ui/icons/Tablet";
import { FaPepperHot } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";

import { NavLink } from "react-router-dom";

// Menu Options
export const drawerOptions = () => {
  const options = [
    {
      text: "Insumos",
      icon: <FaPepperHot size="1.2rem" />,
      to: "/insumos",
    },
    {
      text: "Proveedores",
      icon: <FaUsers size="1.2rem" />,
      to: "/proveedores",
    },
    {
      text: "Compra Insumos",
      icon: <FaShoppingCart size="1.2rem" />,
      to: "/compra-insumos",
    },
    {
      text: "Categorías",
      icon: <FaList size="1.2rem" />,
      to: "/categorias",
    },
    {
      text: "Platos",
      icon: <FaUtensils size="1.2rem" />,
      to: "/platos",
    },
    {
      text: "Combos",
      icon: <FastfoodIcon />,
      to: "/combos",
    },
    {
      text: "Mesas",
      icon: <TabletIcon />,
      to: "/mesas",
    },
  ];

  return options.map((item, index) => (
    <ListItem component={NavLink} to={item.to} button key={index}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItem>
  ));
};
