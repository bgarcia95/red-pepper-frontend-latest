import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliesAction } from "../../redux/actions/supplies/supplies";
import SuppliesTable from "../../components/Table/Table";
import { Typography, Container, Divider } from "@material-ui/core";

const Supplies = () => {
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
  ];

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5" align="center">
          Administración de Insumos
        </Typography>
        <Divider style={{ margin: "2rem 0" }} />
        <div style={{ margin: "2rem 0" }} />
        <SuppliesTable payload={supplies} tableHeaders={tableHeaders} />
      </Container>
    </React.Fragment>
  );
};

export default Supplies;
