import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import PageContainer from "components/PageContainer/PageContainer";
import {
  getCustomersAction,
  deleteCustomerStart,
  deleteCustomerAction,
} from "redux/actions/customers/customers";

const Customers = () => {
  const dispatch = useDispatch();

  const customers = useSelector((state) => state.customers.customers);

  useEffect(() => {
    const getCustomers = () => dispatch(getCustomersAction());
    getCustomers();
  }, [dispatch]);

  const tableHeaders = [
    { title: "ID", field: "id" },
    {
      title: "Nombre Completo",
      field: "name",
      render: (rowData) => `${rowData.name} ${rowData.lastname}`,
    },
  ];

  const formTarget = "customer";

  // Remove Supply
  const onDelete = (id) => {
    dispatch(deleteCustomerStart());
    Swal.fire({
      title: "¿Estás seguro/a?",
      text: "Un cliente eliminado no puede ser restaurado.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, remover!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteCustomerAction(id));
        Swal.fire(
          "¡Removido!",
          "El registro fué removido satisfactoriamente.",
          "success"
        );
      }
    });
  };

  // Loading
  const isLoading = useSelector((state) => state.customers.isLoading);
  const isProcessing = useSelector((state) => state.customers.isProcessing);
  const isFetching = useSelector((state) => state.customers.isFetching);
  const isLoadingData = useSelector((state) => state.customers.error);

  return (
    <PageContainer
      pageTitle="Administración de Clientes"
      payload={customers}
      formTarget={formTarget}
      tableHeaders={tableHeaders}
      isLoading={isLoading}
      isProcessing={isProcessing}
      isFetching={isFetching}
      isLoadingData={isLoadingData}
      buttonLabel="Agregar Cliente"
      dialogTitle="Agregar Cliente"
      onDelete={onDelete}
      tableTitle="Clientes"
    />
  );
};

export default Customers;
