const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};
exports.getSuppliersService = async () => {
  // populate use for full product ById
  const suppliers = await Supplier.find({}).populate("brand.id"); //.select("-products -suppliers");
  return suppliers;
};
exports.getSupplierServiceById = async (id) => {
  const suppliers = await Supplier.findOne({ _id: id });
  return suppliers;
};
exports.updateSupplierServiceById = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
