import _ from "lodash";
import types from "./actionTypes";

export const addItem = (payload) => {
  return function (dispatch) {
    dispatch({ type: types.ADD_ITEM_START });

    const { allItems, newItem } = payload;
    const newList = [newItem, ...allItems];
    dispatch({ type: types.ADD_ITEM_SUCCESS, payload: newList });
  };
};

export const deleteItem = (payload) => {
  return function (dispatch) {
    dispatch({ type: types.DELETE_ITEM_START });
    const { allItems, itemToDelete } = payload;

    const newList = allItems.filter(function (obj) {
      return obj.key !== itemToDelete;
    });
    console.log("new list is", newList);
    console.log("key", itemToDelete);
    dispatch({ type: types.DELETE_ITEM_SUCCESS, payload: newList });
  };
};

export const search = (payload) => {
  return function (dispatch) {
    dispatch({ type: types.SEARCH_START });
    const { allItems, category } = payload;
    const newList = allItems.filter((item) => (item.category = category));
    dispatch({ type: types.SEARCH_SUCCESS, payload: newList });
  };
};
