const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = require("./app");

// database connection
mongoose.connect(process.env.DATABASE_LOCAL_HOST).then(() => {
  console.log("Database connection is successful");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
