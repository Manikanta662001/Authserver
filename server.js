const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./db/DBconnection");
const userRoutes = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;
const { getUser } = require("./controllers/UserController");
const { authenticator } = require("./middleware/authenticator");

app.use("/user", userRoutes);
app.get("/get-user", authenticator, getUser);

app.listen(port, () => {
  console.log(`Port is running under ${port}`);
});
