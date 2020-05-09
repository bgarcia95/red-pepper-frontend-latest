import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableFormat from "../../components/Table/Table";
import { Typography, Container, Divider } from "@material-ui/core";
import { getSuppliersAction } from "../../redux/actions/suppliers/suppliers";

const Suppliers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getSuppliers = () => dispatch(getSuppliersAction());
    getSuppliers();
  }, [dispatch]);

  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const tableHeaders = ["ID", "Nombre", "Dirección", "Teléfono", "Acciones"];

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5" align="center">
          Administración de Proveedores
        </Typography>
        <Divider style={{ margin: "2rem 0" }} />
        <div style={{ margin: "2rem 0" }} />
        <TableFormat payload={suppliers} tableHeaders={tableHeaders} />
      </Container>
    </React.Fragment>
  );
};

export default Suppliers;
