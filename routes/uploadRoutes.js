const express = require("express");
const router = express.Router();
const controller = require("../controllers/file.controller");
const { checkUserAuth } = require("../middleware/authMiddleware");

router.use(checkUserAuth);

  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  router.delete("/files/:name", controller.remove);

  module.exports = router;



