import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import PageContainer from "components/PageContainer/PageContainer";
import {
  getEmployeesAction,
  deleteEmployeeStart,
  deleteEmployeeAction,
} from "redux/actions/employees/employees";
import moment from "moment";

const Employees = () => {
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.employees.employees);

  useEffect(() => {
    const getEmployees = () => dispatch(getEmployeesAction());
    getEmployees();
  }, [dispatch]);

  const tableHeaders = [
    // { title: "ID", field: "id" },
    {
      title: "Nombre Completo",
      field: "name",
      render: (rowData) => `${rowData.name} ${rowData.lastname}`,
    },
    { title: "Sexo", field: "sex" },
    {
      title: "Fecha Nac.",
      field: "birthdate",
      render: (rowData) => moment(rowData.birthdate).format("DD-MM-YYYY"),
    },
    { title: "Dirección", field: "address" },
    { title: "Teléfono", field: "telephone" },
  ];

  const formTarget = "employee";

  // Remove Supply
  const onDelete = (id) => {
    dispatch(deleteEmployeeStart());
    Swal.fire({
      title: "¿Estás seguro/a?",
      text: "Un empleado eliminado no puede ser restaurado.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, remover!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteEmployeeAction(id));
        Swal.fire(
          "¡Removido!",
          "El registro fué removido satisfactoriamente.",
          "success"
        );
      }
    });
  };

  // Loading
  const isLoading = useSelector((state) => state.employees.isLoading);
  const isProcessing = useSelector((state) => state.employees.isProcessing);
  const isFetching = useSelector((state) => state.employees.isFetching);
  const hasErrorLoadingData = useSelector((state) => state.employees.error);

  return (
    <PageContainer
      pageTitle="Administración de Empleados"
      payload={employees}
      formTarget={formTarget}
      tableHeaders={tableHeaders}
      isLoading={isLoading}
      isProcessing={isProcessing}
      isFetching={isFetching}
      hasErrorLoadingData={hasErrorLoadingData}
      buttonLabel="Agregar Empleado"
      dialogTitle="Agregar Empleado"
      onDelete={onDelete}
      tableTitle="Empleados"
    />
  );
};

export default Employees;
