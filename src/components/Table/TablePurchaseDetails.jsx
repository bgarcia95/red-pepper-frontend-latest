import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DeleteButton } from "components/UI/Buttons/Buttons";
import { FaTrash } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TablePurchaseDetails = (props) => {
  const classes = useStyles();
  const {
    purchaseDetails,
    onDeleteItem,
    TAX_RATE,
    invoiceSubtotal,
    invoiceTaxes,
    invoiceTotal,
    supplies,
    fetchedDetails,
  } = props;

  const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
  };

  const filterSupply = (id) =>
    supplies
      .filter((supply) => supply.id === id)
      .map((filtered) => filtered.name);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Detalles
            </TableCell>
            <TableCell align="right">Precio</TableCell>
            {invoiceTotal === 0 || fetchedDetails ? null : (
              <TableCell align="center"></TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Cant.</TableCell>
            <TableCell align="right">Precio Unitario</TableCell>
            <TableCell align="right">Total</TableCell>
            {invoiceTotal === 0 || fetchedDetails ? null : (
              <TableCell key={uuid()} align="center">
                Acción
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {purchaseDetails.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Ingrese detalles a la factura
              </TableCell>
            </TableRow>
          ) : null}
          {purchaseDetails.map((item) => (
            <TableRow key={uuid()}>
              <TableCell key={item.supplyId}>
                {item.desc || filterSupply(item.supplyId)}
              </TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">$ {item.unitPrice}</TableCell>
              <TableCell align="right">$ {ccyFormat(item.total)}</TableCell>
              {item && !fetchedDetails ? (
                <TableCell align="center" key={uuid()}>
                  <DeleteButton onClick={() => onDeleteItem(item.supplyId)}>
                    <FaTrash size="18" />
                  </DeleteButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">$ {ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IVA</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">$ {ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">
              <b>$ {ccyFormat(invoiceTotal)}</b>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TablePurchaseDetails.propTypes = {
  purchaseDetails: PropTypes.array,
  onDeleteItem: PropTypes.func,
  TAX_RATE: PropTypes.number,
  invoiceSubtotal: PropTypes.number,
  invoiceTaxes: PropTypes.number,
  invoiceTotal: PropTypes.number,
  supplies: PropTypes.array,
  fetchedDetails: PropTypes.array,
};

export default TablePurchaseDetails;
