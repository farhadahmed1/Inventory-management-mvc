const {
  createStockService,
  getStockServiceById,
  updateStockServiceById,
  getStockService,
} = require("../services/stock.services");

exports.getStock = async (req, res, next) => {
  try {
    // sortBy = price&price=5000&name=chal&location =dhaka

    let filters = { ...req.query };
    // sort  ,page , limit --> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    // gt , lt , gte , lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);
    const queries = {};

    if (req.query.sort) {
      // price,qunatity   -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const stocks = await getStockService(filters, queries);
    //console.log(stocks);
    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the stock",
      error: error.message,
    });
  }
};
exports.getStockById = async (req, res, next) => {
  try {
    const stock = await getStockServiceById(req.params.id);
    if (!stock) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find Stock with this ID.",
      });
    }
    res.status(200).json({
      status: "success",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't get the Stock",
    });
  }
};

exports.updateStockById = async (req, res, next) => {
  try {
    const result = await updateStockServiceById(req.params.id, req.body);
    //console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find updated product with this ID.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Stock updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the brand",
    });
  }
};
exports.createStock = async (req, res, next) => {
  try {
    const result = await createStockService(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully created the Stock",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the Stock",
    });
  }
};
