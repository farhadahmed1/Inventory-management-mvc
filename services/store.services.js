const Store = require("../models/Store");

exports.createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};
exports.getStoresService = async () => {
  const stores = await Store.find({}); //.select("-_id");
  return stores;
};
exports.getStoreServiceById = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};
exports.updateStoreServiceById = async (id, data) => {
  const result = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
