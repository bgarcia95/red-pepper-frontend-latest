import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  EditButton,
  AddButton,
  WatchButton,
} from "components/UI/Buttons/Buttons";
import { FaEdit, FaEye } from "react-icons/fa";
import SuppliesForm from "components/Forms/Supplies/SuppliesForm";
import SuppliersForm from "components/Forms/Suppliers/SuppliersForm";
import PurchasesForm from "components/Forms/Purchases/PurchasesForm";
import CategoriesForm from "components/Forms/Categories/CategoriesForm";
import DishesForm from "components/Forms/Dishes/DishesForm";
import CombosForm from "components/Forms/Combos/CombosForm";
import TablesForm from "components/Forms/Tables/TablesForm";
import EmployeesForm from "components/Forms/Employees/EmployeesForm";
import CustomersForm from "components/Forms/Customers/CustomersForm";
import PropTypes from "prop-types";
import { Slide } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialog = (props) => {
  const { buttonLabel, title } = props;

  const [open, setOpen] = React.useState(false);

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
      dialogSize = "sm";
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
    case "employee":
      form = <EmployeesForm {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Usuario";
      dialogSize = "sm";
      break;
    case "customer":
      form = <CustomersForm {...props} toggle={toggleModal} modal={open} />;
      customTitle = "Editar Cliente";
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
        TransitionComponent={Transition}
      >
        <DialogTitle
          id="form-dialog-title"
          className="text-center"
          style={{ backgroundColor: "#f44336", color: "#fff" }}
        >
          {title ? title : customTitle}
        </DialogTitle>
        {form}
      </Dialog>
    </div>
  );
};

FormDialog.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default FormDialog;
