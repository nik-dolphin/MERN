const GenerateRandomToken = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
};

const bufferToBase64 = (buffer) => {
  return buffer.toString("base64");
};

const getProductData = (req, response) => {
  const imageUrl = response?.imageFile?.filename
    ? `${req.protocol}://${req.get("host")}/uploads/${
        response?.imageFile?.filename
      }`
    : "";
  const obj = {
    id: response?._id,
    product_sku: response.product_sku,
    product_title: response.product_title,
    product_Brand: response.product_Brand,
    purchase_price: response.purchase_price,
    retail_price: response.retail_price,
    category: response.category,
    quanitity: response.quanitity,
    description: response.description,
    imageUrl: imageUrl,
  };
  return obj;
};

module.exports = { GenerateRandomToken, bufferToBase64, getProductData };
