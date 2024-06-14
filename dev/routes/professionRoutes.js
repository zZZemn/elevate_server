const express = require("express");
const router = express.Router();
const {
  getProfessionById,
  getProfessions,
  setProfession,
  updateProfession,
  deleteProfession,
} = require("../controller/professionController");

router.route("/getById/:id").get(getProfessionById);
router.route("/").get(getProfessions).post(setProfession);
router.route("/:id").put(updateProfession).delete(deleteProfession);

module.exports = router;
