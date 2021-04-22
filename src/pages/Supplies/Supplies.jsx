import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuppliesAction,
  deleteSupplyStart,
} from "redux/actions/supplies/supplies";
import Swal from "sweetalert2";
import { deleteSupplyAction } from "redux/actions/supplies/supplies";
import PageContainer from "components/PageContainer/PageContainer";

const Supplies = () => {
  const dispatch = useDispatch();

  const supplies = useSelector((state) => state.supplies.supplies);

  useEffect(() => {
    const getSupplies = () => dispatch(getSuppliesAction());
    getSupplies();
  }, [dispatch]);

  const tableHeaders = [
    // { title: "ID", field: "id" },
    { title: "Nombre", field: "name" },
    { title: "Presentación", field: "presentation" },
    { title: "Descripción", field: "description" },
    { title: "Unidad de Medida", field: "unitOfMeasure" },
    { title: "Cantidad Mínima", field: "minimumQty" },
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
  const hasErrorLoadingData = useSelector((state) => state.supplies.error);

  return (
    <PageContainer
      pageTitle="Administración de Insumos"
      payload={supplies}
      formTarget={formTarget}
      tableHeaders={tableHeaders}
      isLoading={isLoading}
      isProcessing={isProcessing}
      isFetching={isFetching}
      hasErrorLoadingData={hasErrorLoadingData}
      buttonLabel="Agregar Insumo"
      dialogTitle="Agregar Insumo"
      onDelete={onDelete}
      tableTitle="Insumos"
    />
  );
};

export default Supplies;
