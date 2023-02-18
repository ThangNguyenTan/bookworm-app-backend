const { categories: Categories } = require("../models");
const { StatusCodes } = require("http-status-codes");

const getAllCategories = async (req, res) => {
  const categoryList = await Categories.findAll({
    attributes: ["id", "category_name"],
    order: [["category_name", "ASC"]],
  });

  return res.status(StatusCodes.OK).json(categoryList);
};

module.exports = {
  getAllCategories,
};
