const express = require("express");
const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  login
} = require("../controllers/UserController");
const { uservalidator, validate } = require("../middlewares/validators");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test app");
});

router.post("/login", login);
router.post("/add", uservalidator, validate, createUser);
router.get("/all", getUsers);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
module.exports = router;
