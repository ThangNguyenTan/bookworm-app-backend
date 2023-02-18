const sequelize = require("sequelize");
const {
  minDiscountPriceQueryCoalesce,
  avgRatingsBookQuery,
} = require("../utils/queries");
const { authors: Authors, books: Books } = require("../models");
const { sortBooksQuery } = require("../utils/sorter");

// These the definition of the the required fields of a book
// for the front-end SPA to behave normally with out crashing
const mandatoryAttributesForBooks = {
  attributes: {
    include: [
      [sequelize.literal(`${minDiscountPriceQueryCoalesce}`), "discount_price"],
    ],
  },
  include: [{ model: Authors, attributes: ["id", "author_name"] }],
};

// Create generic fetch object for all of the list
// Default value is for fetching highlyRatedBooks
const fetchObject = {
  ...mandatoryAttributesForBooks,
  order: [
    sequelize.literal(`${avgRatingsBookQuery} DESC`),
    ...sortBooksQuery("priceasc"),
  ],
  limit: 8,
  offset: 0,
};

const getOnSaleBooks = async (limit) => {
  // Filter the books by on sale
  // i.e. the difference between book price and discount price.
  // The higher the difference the higher the rankings
  const onSaleBooks = await Books.findAll({
    ...fetchObject,
    order: [...sortBooksQuery("onsale")],
    limit,
  });

  return onSaleBooks;
};

const getPopularBooks = async (limit) => {
  // Filter the books by popularity
  // i.e. number of reviews.
  // The more the reviews the higher the rankings
  const popularBooks = await Books.findAll({
    ...fetchObject,
    order: [...sortBooksQuery("popularity")],
    limit,
  });

  return popularBooks;
};

const getHighlyRatedBooks = async (limit) => {
  // Filter the books by average ratings
  // The higher the ratings the higher the rankings
  const highlyRatedBooks = await Books.findAll({
    ...fetchObject,
    limit,
  });

  return highlyRatedBooks;
};

module.exports = {
  getOnSaleBooks,
  getHighlyRatedBooks,
  getPopularBooks,
  mandatoryAttributesForBooks,
};
