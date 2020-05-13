import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SuppliesFormik from "../Formik/SuppliesFormik";
import { EditButton, AddButton } from "../UI/Buttons/Buttons";
import { FaEdit } from "react-icons/fa";
import SuppliersFormik from "../Formik/SuppliersFormik";

const FormDialog = (props) => {
  const { buttonLabel } = props;

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
  let dialogSize = "";

  switch (props.formTarget) {
    case "supply":
      form = <SuppliesFormik {...props} toggle={toggleModal} modal={open} />;
      sufix = "Insumo";
      dialogSize = "md";
      break;
    case "supplier":
      form = <SuppliersFormik {...props} toggle={toggleModal} modal={open} />;
      sufix = "Proveedor";
      dialogSize = "sm";
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
        maxWidth={dialogSize}
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title" className="text-center">
          {title ? title : `Editar ${sufix}`}
        </DialogTitle>
        <DialogContent>{form}</DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
