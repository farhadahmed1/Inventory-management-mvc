const {
  getCategoryService,
  createCategoryService,
} = require("../services/category.services");

exports.getCategory = async (req, res, next) => {
  try {
    const brands = await getCategoryService();
    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the brand",
    });
  }
};
exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully created the brand",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the brand",
    });
  }
};
