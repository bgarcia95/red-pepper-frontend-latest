import {
  addSupplySuccess,
  updateSupplySuccess,
  deleteSupplySuccess,
} from "../../../redux/actions/supplies/supplies";
import {
  DELETE_SUPPLY_SUCCESS,
  UPDATE_SUPPLY_SUCCESS,
  ADD_SUPPLY_SUCCESS,
} from "redux/utils/actions";

test("should setup remove supply action object", () => {
  const action = deleteSupplySuccess(1);
  expect(action).toEqual({
    type: DELETE_SUPPLY_SUCCESS,
    id: 1,
  });
});

test("should setup update supply action object", () => {
  const action = updateSupplySuccess({
    Id: 1,
    Name: "PAN PARA HAMBURGUESA",
    // Description: "PARA ELABORAR HAMBURGUESAS",
    // MinimumQty: 25,
    // Presentation: "UNIDADES",
    // UnitOfMeasure: "UNIDAD",
  });
  expect(action).toEqual({
    type: UPDATE_SUPPLY_SUCCESS,
    supply: {
      Id: 1,
      Name: "PAN PARA HAMBURGUESA",
      //   Description: "PARA ELABORAR HAMBURGUESAS",
      //   MinimumQty: 25,
      //   Presentation: "UNIDADES",
      //   UnitOfMeasure: "UNIDAD",
    },
  });
});

test("should setup add supply action object with provided values", () => {
  const supplyData = {
    Name: "PAN PARA HAMBURGUESA",
    Description: "PARA ELABORAR HAMBURGUESAS",
    MinimumQty: 25,
    Presentation: "UNIDADES",
    UnitOfMeasure: "UNIDAD",
  };
  const action = addSupplySuccess(supplyData);
  expect(action).toEqual({
    type: ADD_SUPPLY_SUCCESS,
    supply: {
      ...supplyData,
    },
  });
});
