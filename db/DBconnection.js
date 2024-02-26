const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => console.log(err, "DB error"));
