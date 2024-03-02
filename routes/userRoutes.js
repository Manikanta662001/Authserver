const express = require("express");
const router = express.Router();
const { registerUser, loginUser,upload } = require("../controllers/UserController");

router.post("/register",upload.single("file"), registerUser);
router.post("/login", loginUser);

module.exports = router;
