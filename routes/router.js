const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const usermodel = require("../models/userSchema");
const { STATUS_TYPES } = require("../utils/Constants");

router.post("/register", async (req, res) => {
  console.log(req.body, "Body");
  const { email, password, cpassword } = req.body;
  try {
    const alreadyuser = await usermodel.findOne({ email });
    if (alreadyuser) {
      return res
        .status(STATUS_TYPES.DUPLICATE_KEY)
        .send({ error: "Email Already Exists" });
      // throw new Error("Email Already Exists");
    } else {
      const incomingdt = { ...req.body };
      incomingdt["password"] = await bcrypt.hash(password, 10);
      incomingdt["cpassword"] = await bcrypt.hash(cpassword, 10);
      const dbres = await usermodel.create(incomingdt);
      res.status(STATUS_TYPES.CREATED).send(dbres);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS_TYPES.DUPLICATE_KEY)
      .send({ error: error.message });
  }
});

module.exports = router;
