const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const {
  getAllOrders,
  createOrder,
  getOrderByID,
} = require("../../../controllers/orders.controllers");
const {
  createOrderValidation,
} = require("../../../validations/orders.validations");

router.get("/", expressAsyncHandler(getAllOrders));

router.get("/:id", expressAsyncHandler(getOrderByID));

router.post("/", createOrderValidation, expressAsyncHandler(createOrder));

module.exports = router;
