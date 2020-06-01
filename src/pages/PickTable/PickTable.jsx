import React, { useState, useEffect } from "react";
import {
  IconButton,
  Grid,
  Divider,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { FaArrowLeft } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getTablesAction } from "redux/actions/tables/tables";
import { v4 as uuid } from "uuid";
import PickTableDialog from "components/Modals/PickTableDialog";

const useStyles = makeStyles({
  centerTitle: {
    textAlign: "center",
  },
});

const PickTable = (props) => {
  const classes = useStyles();
  const { history } = props;
  const dispatch = useDispatch();
  const tablesStore = useSelector((state) => state.tables.tables);
  const tablesError = useSelector((state) => state.tables.error);
  const loadingTables = useSelector((state) => state.tables.isLoading);

  const [tables, setTables] = useState([]);

  useEffect(() => {
    const getTables = () => dispatch(getTablesAction());
    getTables();
  }, [dispatch]);

  useEffect(() => {
    setTables(tablesStore);
  }, [tablesStore]);

  // const handleAvailability = (id) => {
  //   setTables(
  //     tables.map((table) =>
  //       table.id === id ? (table = { ...table, isAvailable: false }) : table
  //     )
  //   );
  // };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => history.push("/ordenes")}>
          <FaArrowLeft size="1.2rem" />
        </IconButton>
        <Typography>Regresar</Typography>
      </div>

      <Container>
        <div style={{ margin: "1rem 0" }} />
        <Typography variant="h4" className={classes.centerTitle}>
          Selección de Mesa
        </Typography>
        <div style={{ margin: "1rem 0" }} />
        <Divider />
        <div style={{ margin: "2rem 0" }} />

        <Grid
          container
          justify="flex-start"
          spacing={2}
          style={{ textAlign: "center" }}
        >
          {loadingTables && (
            <React.Fragment key={uuid()}>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: "250px" }}
              >
                <CircularProgress style={{ color: "red" }} />
              </Grid>
            </React.Fragment>
          )}
          <Grid item xs={12} style={{ margin: "2rem 0 1rem 0" }}>
            {tablesError && (
              <div className="error--message">
                <p>Hubo un problema cargando la informacion...</p>
              </div>
            )}
          </Grid>
          {tables.map((table) => (
            <React.Fragment key={uuid()}>
              <Grid item md={4}>
                <PickTableDialog table={table} />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PickTable;
