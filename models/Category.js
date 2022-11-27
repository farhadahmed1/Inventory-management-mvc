const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a Brand name."],
      maxLength: 100,
      unique: true,
    },
    description: String,
    imageURL: {
      type: String,
      validator: [validator.isURL, "Please provide a image URL."],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
