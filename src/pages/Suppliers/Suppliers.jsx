import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableFormat from "../../components/Table/TableFormat";
import {
  Typography,
  Container,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { getSuppliersAction } from "../../redux/actions/suppliers/suppliers";
import FormDialog from "../../components/Modals/FormDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    textAlign: "center",
  },
}));

const Suppliers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getSuppliers = () => dispatch(getSuppliersAction());
    getSuppliers();
  }, [dispatch]);

  const classes = useStyles();
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const tableHeaders = ["ID", "Nombre", "Dirección", "Teléfono", "Acciones"];

  const formTarget = "supplier";

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5" align="center">
          Administración de Proveedores
        </Typography>
        <Divider style={{ margin: "2rem 0" }} />
        <Grid item xs={12} className={classes.container}>
          <FormDialog
            formTarget={formTarget}
            buttonLabel="Agregar Proveedor"
            title="Agregar Proveedor"
          />
        </Grid>
        <div style={{ margin: "2rem 0" }} />
        <TableFormat
          payload={suppliers}
          tableHeaders={tableHeaders}
          formTarget={formTarget}
        />
      </Container>
    </React.Fragment>
  );
};

export default Suppliers;
