import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableFormat from "../../components/Table/TableFormat";
import { Typography, Container, Divider, Grid } from "@material-ui/core";
import {
  getSuppliersAction,
  deleteSupplierAction,
  deleteSupplierStart,
} from "../../redux/actions/suppliers/suppliers";
import FormDialog from "../../components/Modals/FormDialog";
import Swal from "sweetalert2";

const Suppliers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getSuppliers = () => dispatch(getSuppliersAction());
    getSuppliers();
  }, [dispatch]);

  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const tableHeaders = ["ID", "Nombre", "Dirección", "Teléfono", "Acciones"];

  const formTarget = "supplier";

  // Remove Supplier
  const onDelete = (id) => {
    dispatch(deleteSupplierStart());
    Swal.fire({
      title: "¿Estás seguro/a?",
      text: "Un proveedor eliminado no puede ser restaurado.  ",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, remover!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteSupplierAction(id));
        Swal.fire(
          "¡Removido!",
          "El registro fué removido satisfactoriamente.",
          "success"
        );
      }
    });
  };

  // Loading
  const isLoading = useSelector((state) => state.suppliers.isLoading);
  const isProcessing = useSelector((state) => state.suppliers.isProcessing);
  const isFetching = useSelector((state) => state.suppliers.isFetching);
  const isLoadingData = useSelector((state) => state.suppliers.error);

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5" align="center">
          Administración de Proveedores
        </Typography>
        <Divider style={{ margin: "2rem 0" }} />

        <Grid item xs={12} className="text-center">
          <FormDialog
            formTarget={formTarget}
            buttonLabel="Agregar Proveedor"
            title="Agregar Proveedor"
          />
        </Grid>
        <div style={{ margin: "2rem 0" }} />
        {isLoadingData && (
          <div className="error--message">
            <p>Hubo un problema cargando la informacion...</p>
          </div>
        )}
        <TableFormat
          payload={suppliers}
          tableHeaders={tableHeaders}
          formTarget={formTarget}
          onDelete={onDelete}
          isLoading={isLoading}
          isProcessing={isProcessing}
          isFetching={isFetching}
        />
      </Container>
    </React.Fragment>
  );
};

export default Suppliers;
