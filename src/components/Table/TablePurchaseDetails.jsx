import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DeleteButton } from "../UI/Buttons/Buttons";
import { FaTrash } from "react-icons/fa";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TablePurchaseDetails = (props) => {
  const classes = useStyles();
  const {
    payload,
    onDeleteItem,
    TAX_RATE,
    invoiceSubtotal,
    invoiceTaxes,
    invoiceTotal,
    purchaseDetails,
    supplies,
  } = props;

  const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
  };

  const details = purchaseDetails.details;

  // if (!details) return "";
  const filterSupply = (id) =>
    supplies
      .filter((supply) => supply.id === id)
      .map((filtered) => filtered.name);

  const subtotal = (items) => {
    return (
      items && items.map(({ total }) => total).reduce((sum, i) => sum + i, 0)
    );
  };

  const fetchedInvoiceSubtotal = subtotal(details);
  const fetchedInvoiceTaxes = TAX_RATE * fetchedInvoiceSubtotal;
  const fetchedInvoiceTotal = fetchedInvoiceTaxes + fetchedInvoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Detalles
            </TableCell>
            <TableCell align="right">Precio</TableCell>
            {invoiceTotal === 0 ? null : <TableCell align="center"></TableCell>}
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Cant.</TableCell>
            <TableCell align="right">Precio Unitario</TableCell>
            <TableCell align="right">Total</TableCell>
            {invoiceTotal === 0 ? null : (
              <TableCell align="center">Acción</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {payload &&
            payload.map((item) => (
              <TableRow key={item.desc}>
                <TableCell>{item.desc}</TableCell>
                <TableCell align="right">{item.qty}</TableCell>
                <TableCell align="right">$ {item.unit}</TableCell>
                <TableCell align="right">$ {ccyFormat(item.total)}</TableCell>
                {item ? (
                  <TableCell align="center">
                    <DeleteButton onClick={() => onDeleteItem(item.supplyId)}>
                      <FaTrash size="18" />
                    </DeleteButton>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          {details &&
            details.map((item) => (
              <TableRow key={item.supplyId}>
                <TableCell>{filterSupply(item.supplyId)}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">$ {item.unitPrice}</TableCell>
                <TableCell align="right">$ {ccyFormat(item.total)}</TableCell>
              </TableRow>
            ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">
              ${" "}
              {details
                ? ccyFormat(fetchedInvoiceSubtotal)
                : ccyFormat(invoiceSubtotal)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IVA</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">
              ${" "}
              {details
                ? ccyFormat(fetchedInvoiceTaxes)
                : ccyFormat(invoiceTaxes)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">
              <b>
                ${" "}
                {details
                  ? ccyFormat(fetchedInvoiceTotal)
                  : ccyFormat(invoiceTotal)}
              </b>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePurchaseDetails;
