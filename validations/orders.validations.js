const Joi = require("joi");
const validateRequest = require("../middlewares/validate");
const { books } = require("../models");

function createOrderValidation(req, res, next) {
  const schema = Joi.object({
    order_amount: Joi.number().required(),
    order_items: Joi.array()
      .items(
        Joi.object({
          bookId: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
          quantity: Joi.number().required(),
          price: Joi.number().required(),
        })
      )
      .min(1)
      .required(),
  });

  validateRequest(req, next, schema);
}

const validateOrderItems = async (orderItems) => {
  let invalidBookID = null;

  for (let i = 0; i < orderItems.length; i++) {
    const orderItem = orderItems[i];
    const existedBook = await books.findByPk(orderItem.bookId);
    if (!existedBook) {
      invalidBookID = orderItem.bookId;
      break;
    }
  }

  return invalidBookID;
};

module.exports = {
  createOrderValidation,
  validateOrderItems,
};
