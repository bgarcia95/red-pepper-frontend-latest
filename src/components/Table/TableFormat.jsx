import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Backdrop, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import FormDialog from "components/Modals/FormDialog";
import { DeleteButton } from "components/UI/Buttons/Buttons";
import { FaTrash } from "react-icons/fa";

const useStyles2 = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "blue",
  },
}));

const TableFormat = (props) => {
  const classes = useStyles2();
  const {
    payload,
    tableHeaders,
    formTarget,
    isLoading,
    isProcessing,
    isFetching,
    onDelete,
    categories,
    tableTitle,
  } = props;

  return (
    <React.Fragment>
      {isProcessing && (
        <Backdrop id="myBackdrop" className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <MaterialTable
        className={classes.table}
        columns={tableHeaders}
        data={payload}
        title={tableTitle}
        isLoading={isLoading || isFetching}
        localization={{
          toolbar: { searchPlaceholder: "Buscar", searchTooltip: "Buscar" },
          body: { emptyDataSourceMessage: "No hay informacion disponible" },
          header: {
            actions: formTarget === "purchase" ? "Acción" : "Acciones",
          },
          pagination: {
            labelDisplayedRows: `{from}-{to} de {count}`,
            labelRowsSelect: `filas`,
            firstTooltip: "Primera Página",
            previousTooltip: "Página Anterior",
            nextTooltip: "Página Siguiente",
            lastTooltip: "Última Página",
          },
        }}
        options={{
          actionsColumnIndex: -1,
          draggable: false,
        }}
        actions={[
          {
            icon: "",
            tooltip: "",
            onClick: (event, rowData) => rowData,
          },
        ]}
        components={{
          Action: (props) => {
            return onDelete ? (
              <div className="buttons-container">
                <FormDialog
                  payload={props.data}
                  formTarget={formTarget}
                  buttonLabel="Editar"
                  categories={formTarget === "dish" && categories}
                />

                <DeleteButton
                  variant="contained"
                  onClick={() => {
                    onDelete(props.data.id);
                  }}
                >
                  <FaTrash />
                </DeleteButton>
              </div>
            ) : (
              <div className="text-center">
                <FormDialog
                  formTarget={formTarget}
                  buttonLabel="Ver"
                  payload={props.data}
                />
              </div>
            );
          },
        }}
      />
    </React.Fragment>
  );
};

export default TableFormat;
