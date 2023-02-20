const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { checkUserAuth } = require("../middleware/authMiddleware");

router.use(checkUserAuth);

router.get("/", categoryController.category_index);
router.post("/", categoryController.category_create_post);
router.get("/:id", categoryController.getsingledata);
router.get("/:id", categoryController.getdataForCreator);
router.patch("/:id", categoryController.category_update);
router.delete("/:id", categoryController.category_delete);

module.exports = router;
