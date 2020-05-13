import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuppliesAction,
  deleteSupplyStart,
} from "../../redux/actions/supplies/supplies";
import TableFormat from "../../components/Table/TableFormat";
import { Typography, Container, Divider, Grid } from "@material-ui/core";
import FormDialog from "../../components/Modals/FormDialog";
import Swal from "sweetalert2";
import { deleteSupplyAction } from "../../redux/actions/supplies/supplies";

const Supplies = () => {
  const dispatch = useDispatch();

  const supplies = useSelector((state) => state.supplies.supplies);

  useEffect(() => {
    const getSupplies = () => dispatch(getSuppliesAction());
    getSupplies();
  }, [dispatch]);

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

  // Remove Supply
  const onDelete = (id) => {
    dispatch(deleteSupplyStart());
    Swal.fire({
      title: "¿Estás seguro/a?",
      text: "Un insumo eliminado no puede ser restaurado.  ",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, remover!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteSupplyAction(id));
        Swal.fire(
          "¡Removido!",
          "El registro fué removido satisfactoriamente.",
          "success"
        );
      }
    });
  };

  // Loading
  const isLoading = useSelector((state) => state.supplies.isLoading);
  const isProcessing = useSelector((state) => state.supplies.isProcessing);
  const isFetching = useSelector((state) => state.supplies.isFetching);
  const isLoadingData = useSelector((state) => state.supplies.error);

  return (
    <Container>
      <Typography variant="h5" align="center">
        Administración de Insumos
      </Typography>
      <Divider style={{ margin: "2rem 0" }} />
      <Grid item xs={12} className="text-center">
        <FormDialog
          formTarget={formTarget}
          buttonLabel="Agregar Insumo"
          title="Agregar Insumo"
        />
      </Grid>
      <div style={{ margin: "2rem 0" }} />
      {isLoadingData && (
        <div className="error--message">
          <p>Hubo un problema cargando la informacion...</p>
        </div>
      )}
      <TableFormat
        payload={supplies}
        tableHeaders={tableHeaders}
        formTarget={formTarget}
        onDelete={onDelete}
        isLoading={isLoading}
        isProcessing={isProcessing}
        isFetching={isFetching}
      />
    </Container>
  );
};

export default Supplies;
