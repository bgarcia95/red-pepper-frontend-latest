import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  deleteCategoryAction,
  deleteCategoryStart,
} from "../../redux/actions/categories/categories";
import Swal from "sweetalert2";
import PageContainer from "../../components/PageContainer/PageContainer";

const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = () => dispatch(getCategoriesAction());
    getCategories();
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);
  const tableHeaders = [
    { title: "ID", field: "id" },
    { title: "Categoría", field: "name" },
    { title: "Descripción", field: "description" },
  ];

  const formTarget = "category";

  // Remove Supplier
  const onDelete = (id) => {
    dispatch(deleteCategoryStart());
    Swal.fire({
      title: "¿Estás seguro/a?",
      text: "Una categoría eliminada no puede ser restaurada.  ",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, remover!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteCategoryAction(id));
        Swal.fire(
          "¡Removido!",
          "El registro fué removido satisfactoriamente.",
          "success"
        );
      }
    });
  };

  // Loading
  const isLoading = useSelector((state) => state.categories.isLoading);
  const isProcessing = useSelector((state) => state.categories.isProcessing);
  const isFetching = useSelector((state) => state.categories.isFetching);
  const isLoadingData = useSelector((state) => state.categories.error);

  return (
    <PageContainer
      pageTitle="Administración de Categorías"
      payload={categories}
      formTarget={formTarget}
      tableHeaders={tableHeaders}
      isLoading={isLoading}
      isProcessing={isProcessing}
      isFetching={isFetching}
      isLoadingData={isLoadingData}
      buttonLabel="Agregar Categoría"
      dialogTitle="Agregar Categoría"
      onDelete={onDelete}
      tableTitle="Categorías"
    />
  );
};

export default Categories;
