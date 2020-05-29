import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDishesAction,
  deleteDishStart,
  deleteDishAction,
} from "redux/actions/dishes/dishes";
import Swal from "sweetalert2";
import PageContainer from "components/PageContainer/PageContainer";
import { getCategoriesAction } from "redux/actions/categories/categories";

const Dishes = () => {
  const dispatch = useDispatch();

  const dishes = useSelector((state) => state.dishes.dishes);
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    const getDishes = () => dispatch(getDishesAction());
    getDishes();
    const getCategories = () => dispatch(getCategoriesAction());
    getCategories();
  }, [dispatch]);

  const tableHeaders = [
    { title: "ID", field: "id" },
    { title: "Nombre", field: "name" },
    { title: "Descripción", field: "description" },
    {
      title: "Precio",
      field: "price",
      type: "currency",
      cellStyle: { textAlign: "left" },
    },
  ];

  const formTarget = "dish";

  // Remove Supply
  const onDelete = (id) => {
    dispatch(deleteDishStart());
    Swal.fire({
      title: "¿Estás seguro/a?",
      text: "Un platillo eliminado no puede ser restaurado.  ",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, remover!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteDishAction(id));
        Swal.fire(
          "¡Removido!",
          "El registro fué removido satisfactoriamente.",
          "success"
        );
      }
    });
  };

  // Loading
  const isLoading = useSelector((state) => state.dishes.isLoading);
  const isProcessing = useSelector((state) => state.dishes.isProcessing);
  const isFetching = useSelector((state) => state.dishes.isFetching);
  const hasErrorLoadingData = useSelector((state) => state.dishes.error);

  return (
    <PageContainer
      pageTitle="Administración de Platillos"
      payload={dishes}
      categories={categories}
      formTarget={formTarget}
      tableHeaders={tableHeaders}
      isLoading={isLoading}
      isProcessing={isProcessing}
      isFetching={isFetching}
      hasErrorLoadingData={hasErrorLoadingData}
      buttonLabel="Agregar Platillo"
      dialogTitle="Agregar Platillo"
      onDelete={onDelete}
      tableTitle="Platillos"
    />
  );
};

export default Dishes;
