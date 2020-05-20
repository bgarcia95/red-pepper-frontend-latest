import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import PageContainer from "components/PageContainer/PageContainer";
import {
  deleteTableStart,
  deleteTableAction,
  getTablesAction,
} from "redux/actions/tables/tables";

const Tables = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getTables = () => dispatch(getTablesAction());
    getTables();
  }, [dispatch]);

  const tables = useSelector((state) => state.tables.tables);

  const tableHeaders = [
    { title: "ID", field: "id" },
    { title: "Nombre", field: "name" },
    { title: "Descripción", field: "description" },
    { title: "N° de Sillas", field: "chairs" },
  ];

  const formTarget = "table";

  // Remove Table
  const onDelete = (id) => {
    dispatch(deleteTableStart());
    Swal.fire({
      title: "¿Estás seguro/a?",
      text: "Una mesa eliminada no puede ser restaurada.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, remover!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteTableAction(id));
        Swal.fire(
          "¡Removido!",
          "El registro fué removido satisfactoriamente.",
          "success"
        );
      }
    });
  };

  // Loading
  const isLoading = useSelector((state) => state.tables.isLoading);
  const isProcessing = useSelector((state) => state.tables.isProcessing);
  const isFetching = useSelector((state) => state.tables.isFetching);
  const isLoadingData = useSelector((state) => state.tables.error);

  return (
    <PageContainer
      pageTitle="Administración de Mesas"
      payload={tables}
      formTarget={formTarget}
      tableHeaders={tableHeaders}
      isLoading={isLoading}
      isProcessing={isProcessing}
      isFetching={isFetching}
      isLoadingData={isLoadingData}
      buttonLabel="Agregar Mesa"
      dialogTitle="Agregar Mesa"
      onDelete={onDelete}
      tableTitle={"Mesas"}
    />
  );
};

export default Tables;
