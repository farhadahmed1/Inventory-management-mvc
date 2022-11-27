const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};
exports.getBrandsService = async () => {
  // populate use for full product ById products
  const brands = await Brand.find({}).populate("products"); //.select("-products -suppliers");
  return brands;
};
exports.getBrandServiceById = async (id) => {
  const brands = await Brand.findOne({ _id: id });
  return brands;
};
exports.updateBrandServiceById = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
