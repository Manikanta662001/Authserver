const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./db/DBconnection");
const userRoutes = require("./routes/userRoutes");

const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.10.31",
  "https://manikanta662001.github.io",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("ORIGIN:::", origin);
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json());
app.use("/profile-imgs", express.static(path.join(__dirname, "profile-imgs")));
const port = process.env.PORT || 8000;
const {
  getUser,
  refershAccessToken,
  fetchUserData,
} = require("./controllers/UserController");
const { authenticator } = require("./middleware/authenticator");

app.use("/user", userRoutes);
app.post("/token/refresh", refershAccessToken);
app.get("/get-user", authenticator, getUser);
app.get("/userData", authenticator, fetchUserData);

app.listen(port, () => {
  console.log(`Port is running under ${port}`);
});
