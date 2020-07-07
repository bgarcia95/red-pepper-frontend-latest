import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FaTrash } from "react-icons/fa";
import { MdAdd, MdRemove } from "react-icons/md";
import { Typography, IconButton, Tooltip } from "@material-ui/core";
import { v4 as uuid } from "uuid";

import {
  addProductToOrder,
  reduceProductFromOrder,
  removeProductFromOrder,
} from "redux/actions/orders/orders";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableOrderDetails = (props) => {
  const classes = useStyles();
  const { items, totalOrderAmount } = props;
  const dispatch = useDispatch();

  const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
  };

  if (items.length === 0) {
    return (
      <Typography variant="h5">
        No hay productos añadidos a la orden.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Detalles
            </TableCell>
            <TableCell align="right">Total</TableCell>
            {items.length > 0 && <TableCell align="right"></TableCell>}
          </TableRow>
          <TableRow>
            <TableCell align="right">Cant.</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="right">Precio Unitario</TableCell>
            <TableCell align="right">Total</TableCell>
            {items.length > 0 && <TableCell align="center">Acción</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((prod) => (
            <TableRow key={uuid()}>
              <TableCell align="right">{prod.qty}x</TableCell>
              <TableCell align="center">{prod.title}</TableCell>
              <TableCell align="right">$ {prod.unitPrice}</TableCell>
              <TableCell align="right">${ccyFormat(prod.total)}</TableCell>
              <TableCell align="center">
                <Tooltip title="Reducir">
                  <IconButton
                    onClick={() => dispatch(reduceProductFromOrder(prod.id))}
                    style={{ backgroundColor: "#ccc" }}
                  >
                    <MdRemove size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Incrementar">
                  <IconButton
                    onClick={() => dispatch(addProductToOrder(prod))}
                    style={{ backgroundColor: "#ccc" }}
                  >
                    <MdAdd size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton
                    onClick={() => dispatch(removeProductFromOrder(prod.id))}
                    style={{ backgroundColor: "#EC1704" }}
                  >
                    <FaTrash size={18} color="#fff" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={2} />
            <TableCell rowSpan={2} />
            <TableCell>Subtotal</TableCell>
            <TableCell align="right">$ {ccyFormat(totalOrderAmount)}</TableCell>
          </TableRow>
          <TableRow>
            {/* <TableCell rowSpan={2} />
            <TableCell rowSpan={2} /> */}
            <TableCell>
              <b>TOTAL</b>
            </TableCell>
            <TableCell align="right">
              <b>$ {ccyFormat(totalOrderAmount)}</b>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOrderDetails;
