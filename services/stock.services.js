const { default: mongoose } = require("mongoose");
const Stock = require("../models/Stock");
const ObjectId = mongoose.Types.ObjectId;

exports.createStockService = async (data) => {
  const result = await Stock.create(data);
  return result;
};
exports.getStockService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, stocks };
};
exports.getStockServiceById = async (id) => {
  // const stock = await Stock.findOne({ _id: id })
  //   .populate("store.id")
  //   // .populate("supplier.id")
  //   .populate("brand.id");
  const stock = await Stock.aggregate([
    //stage 1

    // {
    //   $match: { _id: ObjectId(id) },
    // },
    // //stage 2
    // {
    //   $project: {
    //     category: 1,
    //     quantity: 1,
    //     price: 1,
    //     productId: 1,
    //     name: 1,
    //     "brand.name": "$brand.name",
    //     id: 1,
    //     "supplier.id": "$supplier.id",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "brands",
    //     localField: "brand.name",
    //     foreignField: "name",
    //     as: "brandDetails",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "suppliers",
    //     localField: "supplier.id",
    //     foreignField: "_id",
    //     as: "supplierDetailsById",
    //   },
    // },

    {
      $match: {},
    },
    {
      $project: {
        store: 1,
        price: 1,
        // price: { $convert: { input: "price", to: "int" } },
        quantity: 1,
      },
    },

    {
      $group: {
        _id: "$store.name",
        totalProductsPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
      },
    },
  ]);
  // stage 1:

  return stock;
};
exports.updateStockServiceById = async (id, data) => {
  const result = await Stock.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
