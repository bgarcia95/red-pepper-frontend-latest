import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import PageContainer from "../../components/PageContainer/PageContainer";
import {
  getCombosAction,
  deleteComboStart,
  deleteComboAction,
} from "../../redux/actions/combos/combos";

const Combos = () => {
  const dispatch = useDispatch();

  const combos = useSelector((state) => state.combos.combos);

  useEffect(() => {
    const getCombos = () => dispatch(getCombosAction());
    getCombos();
  }, [dispatch]);

  const tableHeaders = [
    { title: "ID", field: "id" },
    { title: "Nombre", field: "name" },
    { title: "Descripción", field: "description" },
    {
      title: "Total",
      field: "total",
      type: "currency",
      cellStyle: () => ({ textAlign: "left" }),
    },
  ];

  const formTarget = "combo";

  // Remove Combo
  const onDelete = (id) => {
    dispatch(deleteComboStart());
    Swal.fire({
      title: "¿Estás seguro/a?",
      text: "Un combo eliminado no puede ser restaurado.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, remover!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteComboAction(id));
        Swal.fire(
          "¡Removido!",
          "El registro fué removido satisfactoriamente.",
          "success"
        );
      }
    });
  };

  // Loading
  const isLoading = useSelector((state) => state.combos.isLoading);
  const isProcessing = useSelector((state) => state.combos.isProcessing);
  const isFetching = useSelector((state) => state.combos.isFetching);
  const isLoadingData = useSelector((state) => state.combos.error);

  return (
    <PageContainer
      pageTitle="Administración de Combos"
      payload={combos}
      formTarget={formTarget}
      tableHeaders={tableHeaders}
      isLoading={isLoading}
      isProcessing={isProcessing}
      isFetching={isFetching}
      isLoadingData={isLoadingData}
      buttonLabel="Agregar Combo"
      dialogTitle="Agregar Combo"
      onDelete={onDelete}
      tableTitle="Combos"
    />
  );
};

export default Combos;
