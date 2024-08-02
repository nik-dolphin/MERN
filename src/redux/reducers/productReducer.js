import { SET_PRODUCT_LIST } from "../../constants";

export const productData = (data = [], action) => {
  console.log("__productData action", action);
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return [...action.data];
    default:
      return data;
  }
};
