import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Backdrop, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import PropTypes from "prop-types";

const useStyles1 = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const TableCustomers = (props) => {
  const classes = useStyles1();
  const {
    payload,
    tableHeaders,
    onGetCustomerData,
    tableTitle,
    clearCustomerData,
  } = props;
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <React.Fragment>
      {/* {isProcessing && (
        <Backdrop id="myBackdrop" className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )} */}
      <MaterialTable
        className={classes.table}
        columns={tableHeaders}
        data={payload}
        title={tableTitle}
        // isLoading={isLoading || isFetching}
        localization={{
          toolbar: { searchPlaceholder: "Buscar", searchTooltip: "Buscar" },
          body: { emptyDataSourceMessage: "No hay informacion disponible" },
          pagination: {
            labelDisplayedRows: `{from}-{to} de {count}`,
            labelRowsSelect: `filas`,
            firstTooltip: "Primera Página",
            previousTooltip: "Página Anterior",
            nextTooltip: "Página Siguiente",
            lastTooltip: "Última Página",
          },
        }}
        onRowClick={(event, rowData) => {
          setSelectedRow(rowData.tableData.id);
          onGetCustomerData(rowData.id);
          if (selectedRow === rowData.tableData.id) {
            clearCustomerData();
            setSelectedRow(null);
          }
        }}
        options={{
          actionsColumnIndex: -1,
          draggable: false,
          rowStyle: (rowData) => ({
            backgroundColor: selectedRow === rowData.tableData.id && "#ccc",
          }),
        }}
      />
    </React.Fragment>
  );
};

TableCustomers.propTypes = {
  payload: PropTypes.array.isRequired,
  tableHeaders: PropTypes.array.isRequired,
};

export default TableCustomers;
