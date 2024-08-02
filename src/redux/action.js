export const addToCart = (type, data) => {
  return {
    type,
    data,
  };
};

export const removeToCart = (type, data) => {
  return {
    type,
    data,
  };
};

export const emptyCart = (type, data) => {
  return {
    type,
  };
};
