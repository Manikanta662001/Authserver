const bcrypt = require("bcrypt");
const usermodel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { STATUS_TYPES } = require("../utils/Constants");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profile-imgs/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "@" + Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });
const registerUser = async (req, res) => {
  try {
    const { filename } = req.file;
    let { user } = req.body;
    user = JSON.parse(user);
    const { email, password, cpassword } = user;
    const alreadyuser = await usermodel.findOne({ email });
    if (alreadyuser) {
      return res
        .status(STATUS_TYPES.DUPLICATE_KEY)
        .send({ error: "Email Already Exists" });
      // throw new Error("Email Already Exists");
    } else {
      const incomingdt = { ...user };
      incomingdt["password"] = await bcrypt.hash(password, 10);
      incomingdt["cpassword"] = await bcrypt.hash(cpassword, 10);
      incomingdt["profileimg"] = filename;
      const dbres = await usermodel.create(incomingdt);
      console.log(incomingdt, dbres, "35");
      res
        .status(STATUS_TYPES.CREATED)
        .send({ message: "User Registered Successfully" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS_TYPES.DUPLICATE_KEY)
      .send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user_or_not = await usermodel.findOne({ email });
  if (user_or_not) {
    const passwordmatch = await bcrypt.compare(password, user_or_not.password);
    if (passwordmatch) {
      //jwt.sign({ id: user_or_not._id }, process.env.JWT_SECRET,{expiresIn:"1d"});
      let token = jwt.sign({ id: user_or_not._id }, process.env.JWT_SECRET);
      return res
        .status(STATUS_TYPES.CREATED)
        .json({ message: "Login Successfull", token });
    } else {
      return res
        .status(STATUS_TYPES.FORBIDDEN)
        .json({ error: "Password is not matching" });
    }
  } else {
    return res
      .status(STATUS_TYPES.FORBIDDEN)
      .json({ error: "Email Not Found" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      throw new Error("User Not valid");
    }
    const result = await usermodel.findOne({ _id: id });
    if (!result) {
      throw new Error("User Not valid");
    }
    return res.status(STATUS_TYPES.OK).json(result);
  } catch (error) {
    return res.status(STATUS_TYPES.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUser, upload };
