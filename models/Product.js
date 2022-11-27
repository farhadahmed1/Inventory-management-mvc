const mongoose = require("mongoose");
const valid = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name must be at least 5 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    // price: {
    //   type: Number,
    //   required: true,
    //   min: [0, "Price cannot be negative"],
    // },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: [valid.isURL, "wrong url"],
      },
    ],
    // imageURLs: [
    //   {
    //     type: String,
    //     required: true,
    //     validate: {
    //       validator: (value) => {
    //         if (!Array.isArray(value)) {
    //           return false;
    //         }
    //         let isValid = true;
    //         value.forEach((url) => {
    //           if (!validator.isURL(url)) {
    //             isValid = false;
    //           }
    //         });
    //         return isValid;
    //       },
    //       message: "Please provide a valid image urls",
    //     },
    //   },
    // ],
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pce", "bag"],
        message: " unit value cannot be {VALUE} , must be kg/liter/pce/bag",
      },
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },

    // quantity: {
    //   type: Number,
    //   required: true,
    //   min: [0, " quantity can't be negative"],
    //   validator: (value) => {
    //     const isInteger = Number.isInteger(value);
    //     if (isInteger) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   },
    //   message: "Quantity must be an integer ",
    // },
    // status: {
    //   type: String,
    //   required: true,
    //   enum: {
    //     values: ["in-stock", " Out-of stock", "discontinued"],
    //     message: "status can't be {VALUE}",
    //   },
    // },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updateAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
