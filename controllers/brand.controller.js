const {
  createBrandService,
  getBrandsService,
  getBrandServiceById,
  updateBrandServiceById,
} = require("../services/brand.services");

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandsService();
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
exports.getBrandById = async (req, res, next) => {
  try {
    const brand = await getBrandServiceById(req.params.id);
    if (!brand) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find Brand with this ID.",
      });
    }
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the brand",
    });
  }
};

exports.updateBrandById = async (req, res, next) => {
  try {
    const result = await updateBrandServiceById(req.params.id, req.body);
    //console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find updated product with this ID.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Brand updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the brand",
    });
  }
};
exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
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
