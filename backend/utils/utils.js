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

module.exports = { GenerateRandomToken, bufferToBase64 };
