const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
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
      min: [0, "Price cannot be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pce"],
        message: " unit value cannot be {VALUE} , must be kg/liter/pce",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, " quantity can't be negative"],
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
        values: ["in-stock", " Out-of stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updateAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data : pre /post request

productSchema.pre("save", function (next) {
  // console.log()
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// schema  - Model - Query
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
