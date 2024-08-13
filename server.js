const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./db/DBconnection");
const userRoutes = require("./routes/userRoutes");

const allowedOrigins = ["http://localhost:3000","https://manikanta662001.github.io/"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
    } else if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS policy"), false);
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/profile-imgs", express.static(path.join(__dirname, "profile-imgs")));
const port = process.env.PORT || 8000;
const { getUser } = require("./controllers/UserController");
const { authenticator } = require("./middleware/authenticator");

app.use("/user", userRoutes);
app.get("/get-user", authenticator, getUser);

// Global error handler to catch the CORS error
app.use((err, req, res, next) => {
  if (err.message.includes("Not allowed by CORS policy")) {
    return res.status(403).json({ error: "Not allowed by CORS policy" });
  }
});
app.listen(port, () => {
  console.log(`Port is running under ${port}`);
});
