const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./db/DBconnection");
const userRoutes = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());
// app.use(router);
const port = process.env.PORT || 8000;
const { STATUS_TYPES } = require("./utils/Constants");

app.use("/user", userRoutes);

// app.get("/",(req,res)=>{
//     res.status(STATUS_TYPES.OK).json("Server created")
// })

app.listen(port, () => {
  console.log(`Port is running under ${port}`);
});
