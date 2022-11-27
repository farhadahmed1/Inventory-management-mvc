const {
  getStoresService,
  getStoreServiceById,
  updateStoreServiceById,
  createStoreService,
} = require("../services/store.services");

exports.getStores = async (req, res, next) => {
  try {
    const brands = await getStoresService();
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
exports.getStoreById = async (req, res, next) => {
  try {
    const brand = await getStoreServiceById(req.params.id);
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

exports.updateStoreById = async (req, res, next) => {
  try {
    const result = await updateStoreServiceById(req.params.id, req.body);
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
exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);
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
