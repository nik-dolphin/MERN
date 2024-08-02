import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART } from "../constants";

export const cartData = (data = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const result = data.filter((item) => item.id === action.data.id);
      if (result.length === 0) {
        return [...data, action.data];
      }
      return data;
    case REMOVE_FROM_CART:
      const removedCartData = data.filter((item) => item.id !== action.data.id);
      if (removedCartData.length === 0) {
        return [];
      }
      return removedCartData;
    case EMPTY_CART:
      return [];
    default:
      return data;
  }
};
