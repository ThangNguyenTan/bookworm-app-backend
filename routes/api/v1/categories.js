const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const {
  getAllCategories,
} = require("../../../controllers/categories.controllers");

router.get("/", expressAsyncHandler(getAllCategories));

module.exports = router;
