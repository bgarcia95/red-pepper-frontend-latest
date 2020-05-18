import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EditButton, AddButton, WatchButton } from "../UI/Buttons/Buttons";
import { FaEdit, FaEye } from "react-icons/fa";
import SuppliesFormik from "../Formik/SuppliesFormik";
import SuppliersFormik from "../Formik/SuppliersFormik";
import PurchasesFormik from "../Formik/PurchasesFormik";
import CategoriesFormik from "../Formik/CategoriesFormik";
import DishesFormik from "../Formik/DishesFormik";
import { useDispatch } from "react-redux";
import { getDishesAction } from "../../redux/actions/dishes/dishes";

const FormDialog = (props) => {
  const { buttonLabel } = props;

  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

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
  } else if (buttonLabel === "Ver") {
    button = (
      <WatchButton onClick={toggleModal} color="primary" variant="contained">
        <FaEye size="18" />
      </WatchButton>
    );
  } else {
    button = (
      <AddButton variant="contained" onClick={toggleModal}>
        {buttonLabel}
      </AddButton>
    );
  }

  let form;
  let customTitle = "";
  let dialogSize = "";

  switch (props.formTarget) {
    case "supply":
      form = <SuppliesFormik {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Insumo";
      dialogSize = "md";
      break;
    case "supplier":
      form = <SuppliersFormik {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Proveedor";
      dialogSize = "sm";
      break;
    case "purchase":
      form = <PurchasesFormik {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Ver Factura";
      dialogSize = "lg";
      break;
    case "category":
      form = <CategoriesFormik {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Categoría";
      dialogSize = "sm";
      break;
    case "dish":
      form = <DishesFormik {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Platillo";
      dialogSize = "lg";
      break;
    default:
      break;
  }

  return (
    <div>
      {button}
      <Dialog
        open={open}
        onClose={() => {
          toggleModal();
          if (props.formTarget === "dish" && props.payload) {
            dispatch(getDishesAction());
          }
        }}
        aria-labelledby="form-dialog-title"
        maxWidth={dialogSize}
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title" className="text-center">
          {title ? title : customTitle}
        </DialogTitle>
        <DialogContent>{form}</DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
