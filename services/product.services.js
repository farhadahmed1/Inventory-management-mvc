const Product = require("../models/Product");
const Brand = require("../models/Brand");

exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};

exports.createProductsService = async (data) => {
  const product = await Product.create(data);
  //step 1: _id ,brand
  // Step 2:update brand
  const { _id: productId, brand } = product;
  const result = await Brand.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );
  return product;
};
exports.updateProductByIdService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    {
      runValidators: true,
    }
  );
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  console.log(result);
  return result;
};

exports.deleteProductByIdService = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};
