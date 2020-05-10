import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SuppliesFormik from "../Formik/SuppliesFormik";
import { makeStyles } from "@material-ui/core";
import { EditButton, AddButton } from "../Buttons/Buttons";
import { FaEdit } from "react-icons/fa";
import SuppliersFormik from "../Formik/SuppliersFormik";

const useStyles = makeStyles((theme) => ({
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  center: {
    margin: "0 auto",
  },
}));

const FormDialog = (props) => {
  const { buttonLabel } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const { title } = props;

  const toggleModal = () => {
    setOpen(!open);
  };

  let button = "";

  if (buttonLabel === "Editar") {
    button = (
      <EditButton onClick={toggleModal} color="primary" variant="contained">
        <FaEdit size="18" />
      </EditButton>
    );
  } else {
    button = (
      <AddButton variant="contained" onClick={toggleModal}>
        {buttonLabel}
      </AddButton>
    );
  }

  let form;
  let sufix = "";

  switch (props.formTarget) {
    case "supply":
      form = <SuppliesFormik {...props} toggle={toggleModal} modal={open} />;
      sufix = "Insumo";
      break;
    case "supplier":
      form = <SuppliersFormik {...props} toggle={toggleModal} modal={open} />;
      sufix = "Proveedor";
      break;
    default:
      break;
  }

  return (
    <div>
      {button}
      <Dialog
        open={open}
        onClose={toggleModal}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title" className={classes.center}>
          {title ? title : `Editar ${sufix}`}
        </DialogTitle>
        <DialogContent>{form}</DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
