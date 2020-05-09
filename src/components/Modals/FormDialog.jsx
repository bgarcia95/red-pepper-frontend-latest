import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SuppliesFormik from "../Formik/SuppliesFormik";
import { makeStyles } from "@material-ui/core";
import { EditButton, AddButton } from "../Buttons/Buttons";
import { FaEdit } from "react-icons/fa";

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

  const toggleModal = () => {
    setOpen(!open);
  };

  let button = "";
  let title = "";

  if (buttonLabel === "Editar") {
    button = (
      <EditButton onClick={toggleModal} color="primary" variant="contained">
        <FaEdit size="18" />
      </EditButton>
    );
    title = "Editar Insumo";
  } else {
    button = <AddButton onClick={toggleModal}>{buttonLabel}</AddButton>;
    title = "Agregar Insumo";
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
          {title}
        </DialogTitle>
        <DialogContent>
          <SuppliesFormik toggle={toggleModal} supply={props.supply} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
