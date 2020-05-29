import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import FormDialog from "components/Modals/FormDialog";
import { DeleteButton } from "components/UI/Buttons/Buttons";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

const useStyles1 = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "blue",
  },
}));

const TableFormat = (props) => {
  const classes = useStyles1();
  const {
    payload,
    tableHeaders,
    formTarget,
    isLoading,
    isProcessing,
    isFetching,
    onDelete,
    categories,
    dishes,
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
          rowStyle: (x, idx) => {
            if (idx % 2) {
              return { backgroundColor: "#f2f2f2" };
            }
          },
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
                  dishes={formTarget === "combo" && dishes}
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

TableFormat.propTypes = {
  payload: PropTypes.array.isRequired,
  tableHeaders: PropTypes.array.isRequired,
  formTarget: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  categories: PropTypes.array,
  dishes: PropTypes.array,
  tableTitle: PropTypes.string.isRequired,
};

export default TableFormat;
