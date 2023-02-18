const Joi = require("joi");
const validateRequest = require("../middlewares/validate");

function createReviewValidation(req, res, next) {
  const schema = Joi.object({
    review_title: Joi.string().required().max(120),
    review_details: Joi.string().empty(""),
    rating_start: Joi.number().required().min(1).max(5),
  });

  validateRequest(req, next, schema);
}

module.exports = {
  createReviewValidation,
};
