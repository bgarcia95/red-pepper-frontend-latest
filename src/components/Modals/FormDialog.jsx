import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  EditButton,
  AddButton,
  WatchButton,
} from "components/UI/Buttons/Buttons";
import { FaEdit, FaEye } from "react-icons/fa";
import SuppliesForm from "components/Forms/SuppliesForm";
import SuppliersForm from "components/Forms/SuppliersForm";
import PurchasesForm from "components/Forms/PurchasesForm";
import CategoriesForm from "components/Forms/CategoriesForm";
import DishesForm from "components/Forms/DishesForm";
import CombosForm from "components/Forms/CombosForm";
import TablesForm from "components/Forms/TablesForm";
import { useDispatch } from "react-redux";
import { getDishesAction } from "redux/actions/dishes/dishes";
import { getCombosAction } from "redux/actions/combos/combos";

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
      form = <SuppliesForm {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Insumo";
      dialogSize = "md";
      break;
    case "supplier":
      form = <SuppliersForm {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Proveedor";
      dialogSize = "sm";
      break;
    case "purchase":
      form = <PurchasesForm {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Ver Factura";
      dialogSize = "lg";
      break;
    case "category":
      form = <CategoriesForm {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Categoría";
      dialogSize = "sm";
      break;
    case "dish":
      form = <DishesForm {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Platillo";
      dialogSize = "lg";
      break;
    case "combo":
      form = <CombosForm {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Combo";
      dialogSize = "lg";
      break;
    case "table":
      form = <TablesForm {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Mesa";
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
        onClose={() => {
          toggleModal();
          if (props.formTarget === "dish" && props.payload) {
            dispatch(getDishesAction());
          }
          if (props.formTarget === "combo" && props.payload) {
            dispatch(getCombosAction());
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
