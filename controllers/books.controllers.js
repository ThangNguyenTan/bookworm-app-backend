const { books: Books } = require("../models");
const { filterBooksQuery } = require("../utils/filterer");
const { sortBooksQuery } = require("../utils/sorter");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const {
  getOnSaleBooks,
  getPopularBooks,
  getHighlyRatedBooks,
  mandatoryAttributesForBooks,
} = require("../business/books.business");

// Query: page, page-size, author, category, ratings, sort
const getAllBooks = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query["page-size"]) || 15;
  const sortCriteria = req.query.sort || "popularity";
  const { author, category, ratings } = req.query;

  // Generate where and order clause for filtering and sorting
  const whereClause = filterBooksQuery({
    author,
    category,
    ratings,
  });
  const orderClause = [...sortBooksQuery(sortCriteria)];

  // Fetch the book list based on the defined criteria
  const bookList = await Books.findAndCountAll({
    ...mandatoryAttributesForBooks,
    where: whereClause,
    order: orderClause,
    offset: (currentPage - 1) * pageSize,
    limit: pageSize,
  });

  return res.status(StatusCodes.OK).json({
    data: bookList.rows,
    total: bookList.count,
    currentPage: currentPage,
    perPage: pageSize,
  });
};

const getRecommendedBooks = async (req, res) => {
  // Get On Sale Books
  const onSaleBooks = await getOnSaleBooks(10);

  // Get Popular Books
  const popularBooks = await getPopularBooks(8);

  // Get Highly Rated Books
  const highlyRatedBooks = await getHighlyRatedBooks(8);

  return res.status(StatusCodes.OK).json({
    onSaleBooks,
    highlyRatedBooks,
    popularBooks,
  });
};

const getBookByID = async (req, res, next) => {
  const id = req.params.id;

  const book = await Books.findOne({
    ...mandatoryAttributesForBooks,
    where: {
      id,
    },
  });

  if (!book) {
    next(createError(StatusCodes.NOT_FOUND, "There is no record with this ID"));
  }

  return res.status(StatusCodes.OK).json(book);
};

module.exports = {
  getAllBooks,
  getRecommendedBooks,
  getBookByID,
};
