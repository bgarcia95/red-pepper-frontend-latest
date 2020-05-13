import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { TableHead, Backdrop, CircularProgress } from "@material-ui/core";
import { FaTrash } from "react-icons/fa";
import { DeleteButton } from "../UI/Buttons/Buttons";
import FormDialog from "../Modals/FormDialog";
import { v4 as uuid } from "uuid";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const TablePaginationActions = (props) => {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

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
    onDelete,
    isLoading,
    isProcessing,
    isFetching,
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
    return tableHeaders.map((field, index) => (
      <TableCell key={index} align="center">
        {field}
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
            <TableRow>{headerOptions()}</TableRow>
          </TableHead>
          <TableBody>
            {isLoading || isFetching ? (
              <TableRow key={uuid()}>
                <TableCell
                  key={uuid()}
                  colSpan={tableHeaders.length}
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
                ).map((item) => {
                  let keyValues = [];
                  for (const key in item) {
                    keyValues.push(key);
                  }
                  return (
                    <TableRow key={uuid()}>
                      {keyValues.map((key) => (
                        <TableCell key={uuid()} align="center">
                          {item[key]}
                        </TableCell>
                      ))}
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  );
                })}
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
                colSpan={tableHeaders.length}
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
                labelRowsPerPage="Filas por página"
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default TableFormat;
