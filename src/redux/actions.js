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
    const { allItems, value } = payload;
    var newList;

    if (value === "price")
      newList = [...allItems].sort(function (a, b) {
        return a[value] - b[value];
      });

    if (value === "category" || value === "item") {
      newList = [...allItems].sort(function (a, b) {
        var nameA = a[value].toUpperCase();
        var nameB = b[value].toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    dispatch({ type: types.SEARCH_SUCCESS, payload: newList });
  };
};
