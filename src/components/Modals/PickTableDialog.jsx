import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { green, red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {
  makeStyles,
  Button,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import CustomersFormTables from "components/Forms/Orders/CustomerFormTables";

const useStyles = makeStyles({
  available: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[500],
      transform: "scale(1.1)",
      transition: ".2s ease-in-out",
    },
    width: "300px",
    color: "white",
  },

  unavailable: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[500],
      transform: "scale(1.1)",
      transition: ".2s ease-in-out",
    },
    width: "300px",
    color: "white",
  },
  title: {
    fontSize: 14,
    backgroundColor: "white",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  cardContent: {
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    backgroundColor: "white",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
  },

  root: {
    width: "300px",
    backgroundColor: "transparent",
    borderColor: "rgba(0,0,0,0.02)",
    overflow: "visible",
  },
  footerAvailable: {
    backgroundColor: green[500],
    color: "white",
    justifyContent: "center",
  },
  footerUnavailable: {
    backgroundColor: red[500],
    color: "white",
    justifyContent: "center",
  },
});

const PickTableDialog = (props) => {
  const { table, handleSubmit } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button
        onClick={toggleModal}
        className={
          table.isAvailable === false ? classes.unavailable : classes.available
        }
      >
        <Card className={classes.root} elevation={0}>
          <CardHeader title={table.name} className={classes.title} />
          <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
              <Grid item md={4} style={{ textAlign: "right" }}>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ fontWeight: "bold" }}
                >
                  Ubicación:
                </Typography>
              </Grid>
              <Grid item md={8} style={{ textAlign: "left" }}>
                <Typography variant="body2" component="p">
                  {table.description}
                </Typography>
              </Grid>

              <Grid item md={4} style={{ textAlign: "right" }}>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ fontWeight: "bold" }}
                >
                  Sillas:
                </Typography>
              </Grid>

              <Grid item md={8} style={{ textAlign: "left" }}>
                <Typography variant="body2" component="p">
                  {table.chairs}
                </Typography>
              </Grid>

              {!table.customer ? null : (
                <React.Fragment>
                  <Grid item md={4} style={{ textAlign: "right" }}>
                    <Typography
                      variant="body2"
                      component="p"
                      style={{ fontWeight: "bold" }}
                    >
                      Cliente:
                    </Typography>
                  </Grid>

                  <Grid item md={8} style={{ textAlign: "left" }}>
                    <Typography variant="body2" component="p">
                      {`${table.customer.name} ${table.customer.lastname}`}
                    </Typography>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </CardContent>
          <CardActions
            className={
              table.isAvailable === false
                ? classes.footerUnavailable
                : classes.footerAvailable
            }
          >
            {table.isAvailable === false ? "NO DISPONIBLE" : "DISPONIBLE"}
          </CardActions>
        </Card>
      </Button>
      <Dialog
        open={open}
        onClose={toggleModal}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title" className="text-center">
          Cliente
        </DialogTitle>
        <CustomersFormTables
          toggle={toggleModal}
          modal={open}
          table={table}
          handleSubmit={handleSubmit}
        />
      </Dialog>
    </div>
  );
};

PickTableDialog.propTypes = {
  table: PropTypes.object.isRequired,
};

export default PickTableDialog;
