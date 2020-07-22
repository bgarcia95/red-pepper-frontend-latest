import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { green, red } from "@material-ui/core/colors";
import {
  makeStyles,
  CardHeader,
  Grid,
  Typography,
  Slide,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import CustomerFormTables from "components/Forms/Orders/CustomerFormTables";

const useStyles = makeStyles({
  buttonContainer: {
    width: "300px",
    transition: ".5s ease",
    borderRadius: "5px",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },

  available: {
    backgroundColor: green[500],
    color: "white",
  },

  unavailable: {
    backgroundColor: red[500],
    color: "white",
  },
  card: {
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    color: "#000",
    width: "100%",
    padding: "10px",
  },
  cardTitle: {
    fontSize: 14,
    backgroundColor: "#fff",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderTop: "1px solid #ccc",
  },
  cardFooter: {
    color: "white",
    justifyContent: "center",
    margin: "5px 0",
    fontWeight: 500,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: "0.875rem",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  boldText: {
    fontWeight: "bold",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PickTableCard = (props) => {
  const { table } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <CardActionArea className={classes.buttonContainer}>
        <Card
          elevation={0}
          onClick={toggleModal}
          className={
            table.state === 1
              ? ` ${classes.card} ${classes.unavailable} `
              : ` ${classes.card} ${classes.available}`
          }
        >
          <CardHeader title={table.name} className={classes.cardTitle} />
          <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
              <Grid item md={4} className={classes.textRight}>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.boldText}
                >
                  Ubicación:
                </Typography>
              </Grid>
              <Grid item md={8} className={classes.textLeft}>
                <Typography variant="body2" component="p">
                  {table.description}
                </Typography>
              </Grid>

              <Grid item md={4} className={classes.textRight}>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.boldText}
                >
                  Sillas:
                </Typography>
              </Grid>

              <Grid item md={8} className={classes.textLeft}>
                <Typography variant="body2" component="p">
                  {table.chairs}
                </Typography>
              </Grid>
              {!table.customer ? null : (
                <React.Fragment>
                  <Grid item md={4} className={classes.textRight}>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.boldText}
                    >
                      Cliente:
                    </Typography>
                  </Grid>

                  <Grid item md={8} className={classes.textLeft}>
                    <Typography variant="body2" component="p">
                      {`${table.customer.name} ${table.customer.lastname}`}
                    </Typography>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </CardContent>
          <CardActions className={classes.cardFooter}>
            {table.state === 1 ? "NO DISPONIBLE" : "DISPONIBLE"}
          </CardActions>
        </Card>
      </CardActionArea>
      {table.state === 0 && (
        <Dialog
          open={open}
          onClose={toggleModal}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth={true}
          TransitionComponent={Transition}
        >
          <DialogTitle
            id="form-dialog-title"
            className="text-center"
            style={{ backgroundColor: "#f44336", color: "#fff" }}
          >
            Cliente
          </DialogTitle>
          <CustomerFormTables
            toggle={toggleModal}
            modal={open}
            table={table}
            customers={props.customers}
          />
        </Dialog>
      )}
    </React.Fragment>
  );
};

PickTableCard.propTypes = {
  table: PropTypes.object.isRequired,
};

export default PickTableCard;
