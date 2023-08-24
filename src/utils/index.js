const convertToRupiah = (price) => {
  const rupiahFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return rupiahFormat;
};

const convertToInt = (price) => {
  const convertedPrice = parseInt(price.replace(/\./g, ""));
  return convertedPrice;
};

export { convertToRupiah, convertToInt };
