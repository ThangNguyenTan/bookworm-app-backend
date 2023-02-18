const { authors: Authors } = require("../models");
const { StatusCodes } = require("http-status-codes");

const getAllAuthors = async (req, res) => {
  const authorList = await Authors.findAll({
    attributes: ["id", "author_name"],
    order: [["author_name", "ASC"]],
  });

  return res.status(StatusCodes.OK).json(authorList);
};

module.exports = {
  getAllAuthors,
};
