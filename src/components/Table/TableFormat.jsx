import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import FormDialog from "components/Modals/FormDialog";
import { DeleteButton } from "components/UI/Buttons/Buttons";
import { FaTrash } from "react-icons/fa";
import httpService from "services/httpService";
import { useRef } from "react";

const useStyles2 = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "blue",
  },
}));

const TableFormat = (props) => {
  const classes = useStyles2();
  const tableRef = useRef();
  const refresh = () => {
    console.log(
      "Did refresh!",
      tableRef.current && tableRef.current.onQueryChange()
    );

    return tableRef.current && tableRef.current.onQueryChange();
  };

  const { tableHeaders, formTarget, onDelete, categories, tableTitle } = props;

  return (
    <React.Fragment>
      {/*{isProcessing && (
        <Backdrop id="myBackdrop" className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}*/}
      <Grid item xs={12} className="text-center">
        <FormDialog
          formTarget={props.formTarget}
          buttonLabel={props.buttonLabel}
          title={props.dialogTitle}
          categories={props.formTarget === "dish" && props.categories}
          onRefresh={refresh}
        />
      </Grid>
      <div style={{ margin: "2rem 0" }} />
      <MaterialTable
        className={classes.table}
        columns={tableHeaders}
        tableRef={tableRef}
        data={(query) =>
          new Promise(async (resolve, reject) => {
            const response = await httpService.get(
              `/provider?page=${query.page + 1}&size=${query.pageSize}`
            );
            const headersToJson = JSON.parse(response.headers["x-pagination"]);

            resolve({
              data: response.data,
              page: headersToJson.Page - 1,
              totalCount: headersToJson.TotalCount,
            });
            // })
          })
        }
        title={tableTitle}
        // isLoading={isLoading || isFetching}
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
                  onRefresh={refresh}
                />

                <DeleteButton
                  variant="contained"
                  onClick={() => {
                    onDelete(props.data.id);
                    refresh();
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
      <button
        onClick={() => {
          refresh();
        }}
      >
        ok
      </button>
    </React.Fragment>
  );
};

export default TableFormat;
