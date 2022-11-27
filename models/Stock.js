const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, " Please provide a name for this product"],
      trim: true,
      // unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [60, "Name must be at least 5 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product Price cannot be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pce", "bag"],
        message: " unit value cannot be {VALUE} , must be kg/liter/pce/bag",
      },
    },

    imageURLs: [
      {
        type: String,
        required: true,
        validator: [validator.isURL, " Please provide a valid URL"],
        // validate: {
        //   validator: (value) => {
        //     if (!Array.isArray(value)) {
        //       return false;
        //     }
        //     let isValid = true;
        //     value.forEach((url) => {
        //       if (!validator.isURL(url)) {
        //         isValid = false;
        //       }
        //     });
        //     return isValid;
        //   },
        //   message: "Please provide a valid image urls",
        // },
      },
    ],

    category: {
      type: String,
      required: true,
      lowercase: true,
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

    quantity: {
      type: Number,
      required: true,
      min: [0, "Product Quantity can't be negative"],
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else {
          return false;
        }
      },
      message: "Quantity must be an integer ",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },

    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name."],
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chattogram",
            "rajshahi",
            "khulna",
            "barishal",
            "rangpur",
            "mymensingh",
          ],
          message: "{VALUE} is not a valid  name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    supplier: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name."],
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "supplier",
      },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// stockSchema.pre("save", function (next) {
//   if (this.quantity == 0) {
//     this.status = "out-of-stock";
//   }
//   next();
// });

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
