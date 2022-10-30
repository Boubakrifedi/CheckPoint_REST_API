const express = require("express");
const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json("test app");
});

router.post("/add", createUser);
router.get("/all", getUsers);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
module.exports = router;
