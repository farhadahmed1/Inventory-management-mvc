const {
  getSupplierServiceById,
  getSuppliersService,
  updateSupplierServiceById,
  createSupplierService,
} = require("../services/supplier.services");

exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getSuppliersService();
    res.status(200).json({
      status: "success",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the Supplier",
    });
  }
};
exports.getSupplierById = async (req, res, next) => {
  try {
    const supplier = await getSupplierServiceById(req.params.id);
    if (!supplier) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find Supplier with this ID.",
      });
    }
    res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the Supplier",
    });
  }
};

exports.updateSupplierById = async (req, res, next) => {
  try {
    const result = await updateSupplierServiceById(req.params.id, req.body);
    //console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find updated product with this ID.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Supplier updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the Supplier",
    });
  }
};
exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully created the Supplier",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the Supplier",
    });
  }
};
