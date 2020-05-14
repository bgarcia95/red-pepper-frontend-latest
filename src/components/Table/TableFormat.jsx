import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TablePaginationActions from "./TablePaginationActions";
import Paper from "@material-ui/core/Paper";
import { TableHead, Backdrop, CircularProgress } from "@material-ui/core";
import { FaTrash } from "react-icons/fa";
import { DeleteButton } from "../UI/Buttons/Buttons";
import FormDialog from "../Modals/FormDialog";
import { v4 as uuid } from "uuid";

const useStyles2 = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  buttonContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "blue",
  },
}));

const TableFormat = (props) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {
    payload,
    tableHeaders,
    formTarget,
    isLoading,
    isProcessing,
    isFetching,
    onDelete,
  } = props;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, payload.length - page * rowsPerPage);

  // To fix out of range issue on Table
  useEffect(() => {
    if (payload.length <= rowsPerPage && page > 0) {
      setPage(0);
    }
  }, [payload.length, rowsPerPage, page, payload]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headerOptions = () => {
    return tableHeaders.map((header, index) => (
      <TableCell key={index} align="center">
        {header.text}
      </TableCell>
    ));
  };

  return (
    <React.Fragment>
      {isProcessing && (
        <Backdrop id="myBackdrop" className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {headerOptions()}
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading || isFetching ? (
              <TableRow key={uuid()}>
                <TableCell
                  key={uuid()}
                  colSpan={tableHeaders.length + 1}
                  rowSpan={rowsPerPage}
                  style={{ textAlign: "center" }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <React.Fragment>
                {Object.keys(payload).length === 0 && (
                  <TableRow key={uuid()}>
                    <TableCell
                      key={uuid()}
                      colSpan={tableHeaders.length}
                      rowSpan={rowsPerPage}
                      style={{ textAlign: "center" }}
                    >
                      No hay información disponible
                    </TableCell>
                  </TableRow>
                )}
                {(rowsPerPage > 0
                  ? payload.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : payload
                ).map((item) => (
                  <TableRow key={item.id}>
                    {tableHeaders.map(({ field }) => (
                      <TableCell key={uuid()} align="center">
                        {item[field]}
                      </TableCell>
                    ))}
                    <TableCell key={uuid()}>
                      {onDelete ? (
                        <div className={classes.buttonContainer}>
                          <FormDialog
                            formTarget={formTarget}
                            buttonLabel="Editar"
                            payload={item}
                          />
                          <DeleteButton
                            variant="contained"
                            onClick={() => {
                              onDelete(item.id);

                              // if (rowsCount < payload.length && page > 0) {
                              //   setPage(page - 1);
                              // }
                              // if (payload.length >= rowsPerPage && page > 0) {
                              //   setPage(page - 1);
                              // }
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
                            payload={item}
                          />
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            )}

            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 30 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                colSpan={tableHeaders.length + 1}
                count={payload.length}
                rowsPerPage={rowsPerPage}
                page={page > 0 && payload.length === rowsPerPage ? 0 : page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                labelDisplayedRows={({ from, to, count }) => {
                  return "" + from + "-" + to + " de " + count;
                }}
                labelRowsPerPage="Registros por página"
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default TableFormat;
