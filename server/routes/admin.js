const express = require("express");
const router = express.Router();

const { getAllAdmin, deleteAdmin } = require("../controllers/admin");

router.route("/").get(getAllAdmin);
router.route("/:id").delete(deleteAdmin);

module.exports = router;
