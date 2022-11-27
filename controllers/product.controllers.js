const {
  getProductsService,
  createProductsService,
  updateProductByIdService,
  deleteProductByIdService,
  bulkUpdateProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    // const products = await Product
    //   .where("name").equals(/\w/)
    //   .where("quantity").gt(100).lt(600)
    //   .limit(2).sort({ qunatity: -1 })
    const products = await getProductsService();
    // console.log(products.length);

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // save or create

    const result = await createProductsService(req.body);

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const result = await updateProductByIdService(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "Data successfully update!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not Updated ",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      message: "Successfully updated the product",
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Couldn't Update the Product ",
      error: error.message,
    });
  }
};
exports.deleteProductById = async (req, res, next) => {
  try {
    // const {} = req.params;
    const result = await deleteProductByIdService(req.params.id);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the product",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully deleted the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Product is not Deleted",
      error: error.message,
    });
  }
};

exports.fileUpload = async (req, res, next) => {
  try {
    res.status(200).json(req.files);
  } catch (error) {}
};
