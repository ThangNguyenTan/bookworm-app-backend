const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const { getAllAuthors } = require("../../../controllers/authors.controllers");

router.get("/", expressAsyncHandler(getAllAuthors));

module.exports = router;
