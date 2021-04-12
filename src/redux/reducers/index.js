import _ from "lodash";
import types from "../actionTypes";

export const initState = {
  allItems: [],
  currentItems: [{ name: "apples", price: "1", category: "milk", key: "1" }],
  loading: false,
};

const rootReducer = (state = initState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case types.ADD_ITEM_START:
      newState.loading = true;
      return newState;

    case types.ADD_ITEM_SUCCESS:
      newState.allItems = action.payload;
      newState.currentItems = action.payload;
      newState.loading = false;
      return newState;

    case types.DELETE_ITEM_START:
      newState.loading = true;
      return newState;

    case types.DELETE_ITEM_SUCCESS:
      newState.allItems = action.payload;
      newState.currentItems = action.payload;
      newState.loading = false;
      return newState;

    case types.SEARCH_START:
      newState.loading = true;
      return newState;

    case types.SEARCH_SUCCESS:
      newState.currentItems = action.payload;
      newState.loading = false;
      return newState;

    default:
      return newState;
  }
};

export default rootReducer;
