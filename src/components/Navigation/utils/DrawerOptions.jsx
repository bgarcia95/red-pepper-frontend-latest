import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import TabletIcon from "@material-ui/icons/Tablet";
import {
  FaPepperHot,
  FaUserFriends,
  FaUserCheck,
  // FaReceipt,
  FaHamburger,
} from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiTrendingUp } from "react-icons/bi";
import { BsListCheck } from "react-icons/bs";

import { NavLink } from "react-router-dom";
import { List, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

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
    icon: <FaHamburger size="1.2rem" />,
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
  {
    text: "Empleados",
    icon: <FaUserFriends size="1.2rem" />,
    to: "/empleados",
  },
  {
    text: "Clientes",
    icon: <FaUserCheck size="1.2rem" />,
    to: "/clientes",
  },
  // {
  //   text: "Ordenes",
  //   icon: <FaReceipt size="1.2rem" />,
  //   to: "/ordenes",
  // },
  {
    text: "Cocina",
    icon: <FaUtensils size="1.2rem" />,
    to: "/cocina",
  },
  {
    text: "Reporteria",
    icon: <HiOutlineDocumentReport size="1.2rem" />,
    to: "/reporteria",
  },
];

const subOptions = [
  {
    text: "Inventario",
    icon: <BsListCheck size="1.2rem" />,
    to: "/reporteria/inventario",
  },
  {
    text: "Ventas",
    icon: <BiTrendingUp size="1.2rem" />,
    to: "/reporteria/ventas",
  },
];

// Menu Options
export const DrawerOptions = (props) => {
  const classes = useStyles();
  const { location } = props;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => setOpen(!open);

  return options.map((item, index) =>
    item.text !== "Reporteria" ? (
      <ListItem
        component={NavLink}
        to={item.to}
        button
        key={item.text}
        selected={item.to === location}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    ) : (
      <React.Fragment key={item.text}>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <HiOutlineDocumentReport size="1.4rem" />
          </ListItemIcon>
          <ListItemText primary={item.text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subOptions.map((subOpt, index) => (
              <ListItem
                button
                className={classes.nested}
                component={NavLink}
                to={subOpt.to}
                key={subOpt.text}
                selected={subOpt.to === location}
              >
                <ListItemIcon>{subOpt.icon}</ListItemIcon>
                <ListItemText primary={subOpt.text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    )
  );
};

export default DrawerOptions;
