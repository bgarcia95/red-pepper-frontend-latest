import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliesAction } from "../../redux/actions/supplies/supplies";
import TableFormat from "../../components/Table/TableFormat";
import {
  Typography,
  Container,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import FormDialog from "../../components/Modals/FormDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    textAlign: "center",
  },
}));

const Supplies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    const getSupplies = () => dispatch(getSuppliesAction());
    getSupplies();
  }, [dispatch]);

  const supplies = useSelector((state) => state.supplies.supplies);
  const tableHeaders = [
    "ID",
    "Nombre",
    "Presentación",
    "Descripción",
    "Unidad de Medida",
    "Cantidad Mínima",
    "Acciones",
  ];

  const formTarget = "supply";

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5" align="center">
          Administración de Insumos
        </Typography>
        <Divider style={{ margin: "2rem 0" }} />
        <Grid item xs={12} className={classes.container}>
          <FormDialog
            formTarget={formTarget}
            buttonLabel="Agregar Insumo"
            title="Agregar Insumo"
          />
        </Grid>
        <div style={{ margin: "2rem 0" }} />
        <TableFormat
          payload={supplies}
          tableHeaders={tableHeaders}
          formTarget={formTarget}
        />
      </Container>
    </React.Fragment>
  );
};

export default Supplies;
