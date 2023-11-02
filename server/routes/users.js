const express = require("express");
const router = express.Router();

const {
  getAllUser,
  deleteUser,
  getSingleUser,
} = require("../controllers/users");

router.route("/").get(getAllUser);
router.route("/:id").delete(deleteUser).get(getSingleUser);

module.exports = router;
