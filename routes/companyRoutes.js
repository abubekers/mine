const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { checkUserAuth } = require("../middleware/authMiddleware");

router.use(checkUserAuth);

router.get("/", companyController.company_index);
router.post("/", companyController.company_create);
router.patch("/:id", companyController.company_update);
router.delete("/:id", companyController.company_delete);
router.get("/:id", companyController.getdataForCreator);
router.get("/:id", companyController.getdataForCategory);
router.get("/:id", companyController.getsinglecompanydata);

module.exports = router;
