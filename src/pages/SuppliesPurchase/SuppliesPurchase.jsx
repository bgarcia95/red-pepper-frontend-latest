import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesAction } from "../../redux/actions/supplies-purchases/purchases";
import PageContainer from "../../components/PageContainer/PageContainer";

const SuppliesPurchase = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases.purchases);

  useEffect(() => {
    const getPurchases = () => dispatch(getPurchasesAction());
    getPurchases();
  }, [dispatch]);

  const tableHeaders = [
    { text: "ID", field: "id" },
    { text: "N° Factura", field: "invoiceNumber" },
    { text: "Total", field: "total" },
  ];

  const formTarget = "purchase";

  // Loading
  const isLoading = useSelector((state) => state.purchases.isLoading);
  const isProcessing = useSelector((state) => state.purchases.isProcessing);
  const isFetching = useSelector((state) => state.purchases.isFetching);
  const isLoadingData = useSelector((state) => state.purchases.error);

  return (
    <PageContainer
      pageTitle="Administración de Compra de Insumos"
      payload={purchases}
      formTarget={formTarget}
      tableHeaders={tableHeaders}
      isLoading={isLoading}
      isProcessing={isProcessing}
      isFetching={isFetching}
      isLoadingData={isLoadingData}
      buttonLabel="Agregar Compra"
      dialogTitle="Agregar Compra"
    />
  );
};

export default SuppliesPurchase;
