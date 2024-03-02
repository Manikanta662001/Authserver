const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./db/DBconnection");
const userRoutes = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());
app.use("/profile-imgs",express.static(path.join(__dirname,"profile-imgs")))
const port = process.env.PORT || 8000;
const { getUser } = require("./controllers/UserController");
const { authenticator } = require("./middleware/authenticator");

app.use("/user", userRoutes);
app.get("/get-user", authenticator, getUser);

app.listen(port, () => {
  console.log(`Port is running under ${port}`);
});
