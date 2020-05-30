import suppliesReducer from "redux/reducers/supplies/supplies";
import supplies from "tests/fixtures/supplies";
import {
  DELETE_SUPPLY_SUCCESS,
  ADD_SUPPLY_SUCCESS,
  UPDATE_SUPPLY_SUCCESS,
} from "redux/utils/actions";

test("should set default state", () => {
  const state = suppliesReducer(
    {
      error: null,
      isFetching: false,
      isLoading: true,
      isProcessing: false,
      supplies: [],
    },
    { type: "@@INIT" }
  );
  expect(state).toEqual({
    error: null,
    isFetching: false,
    isLoading: true,
    isProcessing: false,
    supplies: [],
  });
});

test("should remove supply by ID", () => {
  const action = {
    type: DELETE_SUPPLY_SUCCESS,
    id: supplies[0].id,
  };
  const state = suppliesReducer(
    {
      error: null,
      isFetching: false,
      isLoading: true,
      isProcessing: false,
      supplies: supplies,
    },
    action
  );

  expect(state).toEqual({
    error: null,
    isFetching: false,
    isLoading: true,
    isProcessing: false,
    supplies: [supplies[1], supplies[2]],
  });
});

test("should not remove supply if ID not found", () => {
  const action = {
    type: DELETE_SUPPLY_SUCCESS,
    id: -1,
  };
  const state = suppliesReducer(
    {
      error: null,
      isFetching: false,
      isLoading: true,
      isProcessing: false,
      supplies: supplies,
    },
    action
  );

  expect(state).toEqual({
    error: null,
    isFetching: false,
    isLoading: true,
    isProcessing: false,
    supplies: supplies,
  });
});

// add supply
test("should add supply", () => {
  const supply = {
    name: "NEW ENTRY",
    description: "NEW ONE",
    minimumQty: 50,
    presentation: "UNTIS",
    unitOfMeasure: "UNIT",
  };
  const action = {
    type: ADD_SUPPLY_SUCCESS,
    supply,
  };
  const state = suppliesReducer(
    {
      error: null,
      isFetching: false,
      isLoading: true,
      isProcessing: false,
      supplies: supplies,
    },
    action
  );

  expect(state).toEqual({
    error: null,
    isFetching: false,
    isLoading: true,
    isProcessing: false,
    supplies: [...supplies, supply],
  });
});

// update supply

test("should update supply", () => {
  const supply = {
    id: supplies[0].id,
    name: "PAN PARA HOT DOG",
  };

  const action = {
    type: UPDATE_SUPPLY_SUCCESS,
    supply,
  };

  const state = suppliesReducer(
    {
      error: null,
      isFetching: false,
      isLoading: true,
      isProcessing: false,
      supplies: supplies,
    },
    action
  );

  expect(state.supplies[0].name).toBe(supply.name);
});

test("should not update supply if id not found", () => {
  const supply = {
    id: -1,
    name: "PAN PARA HOT DOG",
  };

  const action = {
    type: UPDATE_SUPPLY_SUCCESS,
    supply,
  };

  const state = suppliesReducer(
    {
      error: null,
      isFetching: false,
      isLoading: true,
      isProcessing: false,
      supplies: supplies,
    },
    action
  );

  expect(state).toEqual({
    error: null,
    isFetching: false,
    isLoading: true,
    isProcessing: false,
    supplies: supplies,
  });
});
