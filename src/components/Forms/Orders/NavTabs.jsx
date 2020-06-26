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
} from "@material-ui/core";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDishesAction } from "redux/actions/dishes/dishes";
import { getCombosAction } from "redux/actions/combos/combos";

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
  },
  appBar: {
    backgroundColor: "green",
  },
  backButtonContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    margin: "1rem 0",
  },
  card: {
    borderRadius: "3px",
  },
  cardTitle: {
    textAlign: "center",
  },
  cardContent: {
    textAlign: "center",
  },
  cardActions: {
    justifyContent: "center",
  },
}));

const NavTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { history } = props;

  const dishes = useSelector((state) => state.dishes.dishes);
  const combos = useSelector((state) => state.combos.combos);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDishes = () => dispatch(getDishesAction());
    getDishes();
    const getCombos = () => dispatch(getCombosAction());
    getCombos();
  }, [dispatch]);

  // To handle change on Tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Typography
          variant="h4"
          className={`${classes.cardContent} ${classes.title}`}
        >
          Preparar Orden
        </Typography>
        <div className={classes.title} />
        <Divider />
        <div style={{ margin: "2rem 0" }} />

        <Grid
          container
          justify="flex-start"
          spacing={2}
          // style={{ textAlign: "center" }}
        >
          {/* {loadingTables && (
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
         )} */}
          {/* <Grid item xs={12} style={{ margin: "2rem 0 1rem 0" }}>
           {tablesError && (
             <div className="error--message">
               <p>Hubo un problema cargando la informacion...</p>
             </div>
           )}
         </Grid> */}
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
            <TabPanel value={value} index={0}>
              <Grid container direction="row" spacing={3}>
                {dishes.map((dish) => (
                  <Grid item md={4} key={dish.id}>
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
                        <Button color="secondary" variant="contained">
                          AGREGAR
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container direction="row" spacing={3}>
                {combos.map((combo) => (
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
                        <Button color="secondary" variant="contained">
                          AGREGAR
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              Ver Orden
            </TabPanel>
          </div>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default NavTabs;
