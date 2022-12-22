const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
// authorization all routes
//router.use(verifyToken);

router.post(
  "/file-update",
  //  multiple image upload
  uploader.array("productImage"),
  // single image upload
  // uploader.single("productImage"),
  productController.fileUpload
);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router
  .route("/")
  .get(
    // verifyToken,
    // authorization("admin", "store-manage"),
    productController.getProducts
  )
  .post(
    verifyToken,
    authorization("admin", "store-manage"),
    productController.createProduct
  );

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(
    verifyToken,
    authorization("admin"),
    productController.deleteProductById
  );

module.exports = router;
