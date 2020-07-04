import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { yellow } from "@material-ui/core/colors";
import {
  IconButton,
  Container,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
  CardHeader,
  CircularProgress,
} from "@material-ui/core";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { v4 as uuid } from "uuid";
import { getDishesAction } from "redux/actions/dishes/dishes";
import { getCombosAction } from "redux/actions/combos/combos";
import { getTablesAction } from "redux/actions/tables/tables";
import { useParams } from "react-router-dom";
import { addProductToOrder } from "redux/actions/orders/orders";
import TableOrderDetails from "components/Table/TableOrderDetails";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
};

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: "0 0 1rem 0",
  },
  appBar: {
    backgroundColor: "green",
  },
  backButtonContainer: {
    display: "flex",
    alignItems: "center",
  },
  centerTitle: {
    textAlign: "center",
  },
  title: {
    margin: "1rem 0",
  },
  card: {
    borderRadius: "3px",
  },
  cardTitle: {
    textAlign: "center",
    // borderBottom: "1px solid rgb(240,240,240)",
  },
  cardContent: {
    textAlign: "center",
  },
  cardActions: {
    justifyContent: "center",
    borderTop: "1px solid rgb(240,240,240)",
  },
}));

const Order = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { history } = props;

  const dishes = useSelector((state) => state.dishes.dishes);
  const combos = useSelector((state) => state.combos.combos);
  const tableId = useParams().tableId;
  const tables = useSelector((state) => state.tables.tables);
  const orderedProducts = useSelector((state) => {
    const productsArray = [];
    for (const key in state.orders.orderedProducts) {
      productsArray.push({
        id: key,
        dishId: state.orders.orderedProducts[key].dishId,
        comboId: state.orders.orderedProducts[key].comboId,
        title: state.orders.orderedProducts[key].title,
        unitPrice: state.orders.orderedProducts[key].unitPrice,
        qty: state.orders.orderedProducts[key].qty,
        total: state.orders.orderedProducts[key].total,
      });
    }
    return productsArray;
  });
  const totalOrderAmount = useSelector((state) => state.orders.total);

  const isLoadingTables = useSelector((state) => state.dishes.isLoading);
  const isErrorLoadingTables = useSelector((state) => state.dishes.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDishes = () => dispatch(getDishesAction());
    getDishes();
    const getCombos = () => dispatch(getCombosAction());
    getCombos();
    const getTables = () => dispatch(getTablesAction());
    getTables();
  }, [dispatch]);

  const selectedTable = tables.find((table) => table.id === +tableId);

  // To handle change on Tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onAddProductToOrderHandler = (
    e,
    prodOrderId,
    dishId,
    comboId,
    title,
    unitPrice
  ) => {
    e.preventDefault();

    const product = {
      id: prodOrderId,
      dishId: dishId || null,
      comboId: comboId || null,
      title: title,
      unitPrice: unitPrice,
    };

    dispatch(addProductToOrder(product));
  };

  return (
    <React.Fragment>
      <div className={classes.backButtonContainer}>
        <IconButton onClick={() => history.push("/ordenes")}>
          <FaArrowLeft size="1.2rem" />
        </IconButton>
        <Typography>Regresar</Typography>
      </div>

      <Container>
        <div style={{ margin: "1rem 0" }} />
        <Typography variant="h4" className={classes.centerTitle}>
          Preparar Orden
        </Typography>
        <div style={{ margin: "1rem 0 2rem 0" }}>
          <Divider />
        </div>

        {!isLoadingTables && (
          <div>
            <Typography
              variant="h6"
              className={classes.centerTitle}
              style={{
                backgroundColor: yellow[500],
                width: "30%",
                margin: "0 auto",
              }}
            >
              {!selectedTable
                ? ""
                : `Cliente: ${
                    selectedTable.customer && selectedTable.customer.name
                  } ${
                    selectedTable.customer && selectedTable.customer.lastname
                  }`}
            </Typography>
          </div>
        )}

        {/* Spinner */}
        <Grid
          container
          justify="flex-start"
          spacing={2}
          style={{ textAlign: "center" }}
        >
          {isLoadingTables && (
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

          {/* Display error if data not fetch */}
          <Grid item xs={12} style={{ margin: "2rem 0 1rem 0" }}>
            {isErrorLoadingTables && (
              <div className="error--message">
                <p>Hubo un problema cargando la informacion...</p>
              </div>
            )}
          </Grid>

          {/* Show content if everything is corret */}
          {!isLoadingTables && !isErrorLoadingTables && (
            <div className={classes.root}>
              <AppBar position="static" className={classes.appBar}>
                <Tabs
                  variant="fullWidth"
                  value={value}
                  onChange={handleChange}
                  aria-label="nav tabs example"
                  TabIndicatorProps={{ style: { background: yellow[500] } }}
                >
                  <LinkTab label="Platillos" {...a11yProps(0)} />
                  <LinkTab label="Combos" {...a11yProps(1)} />
                  <LinkTab label="Ver Orden" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              {/* Dishes */}
              <TabPanel value={value} index={0}>
                <Grid container direction="row" spacing={3}>
                  {dishes.map((dish, index) => (
                    <Grid item md={4} xs={12} key={dish.id}>
                      <Card>
                        <CardActionArea className={classes.card}>
                          <CardHeader
                            title={dish.name}
                            className={classes.cardTitle}
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography>
                              <b>$ {dish.price}</b>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.cardActions}>
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={(e) =>
                              onAddProductToOrderHandler(
                                e,
                                `pD-${index}`,
                                dish.id,
                                null,
                                dish.name,
                                dish.price
                              )
                            }
                          >
                            AGREGAR
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              {/* Combos */}
              <TabPanel value={value} index={1}>
                <Grid container direction="row" spacing={3}>
                  {combos.map((combo, index) => (
                    <Grid item md={4} key={combo.id}>
                      <Card>
                        <CardActionArea className={classes.card}>
                          <CardHeader
                            title={combo.name}
                            className={classes.cardTitle}
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography>
                              <b>$ {combo.total}</b>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.cardActions}>
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={(e) =>
                              onAddProductToOrderHandler(
                                e,
                                `pC-${index}`,
                                null,
                                combo.id,
                                combo.name,
                                combo.total
                              )
                            }
                          >
                            AGREGAR
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Divider style={{ margin: "2rem 0" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TableOrderDetails
                    items={orderedProducts}
                    totalOrderAmount={totalOrderAmount}
                  />
                </div>
              </TabPanel>
            </div>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Order;
