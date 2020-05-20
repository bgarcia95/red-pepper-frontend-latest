import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuppliersAction,
  deleteSupplierAction,
  deleteSupplierStart,
} from "../../redux/actions/suppliers/suppliers";
import Swal from "sweetalert2";
import PageContainer from "../../components/PageContainer/PageContainer";

const Suppliers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getSuppliers = () => dispatch(getSuppliersAction());
    getSuppliers();
  }, [dispatch]);

  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const tableHeaders = [
    { title: "ID", field: "id" },
    { title: "Nombre", field: "name" },
    { title: "Dirección", field: "address" },
    { title: "Teléfono", field: "telephone" },
  ];

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
    <PageContainer
      pageTitle="Administración de Proveedores"
      payload={suppliers}
      formTarget={formTarget}
      tableHeaders={tableHeaders}
      isLoading={isLoading}
      isProcessing={isProcessing}
      isFetching={isFetching}
      isLoadingData={isLoadingData}
      buttonLabel="Agregar Proveedor"
      dialogTitle="Agregar Proveedor"
      onDelete={onDelete}
      tableTitle="Proveedores"
    />
  );
};

export default Suppliers;
