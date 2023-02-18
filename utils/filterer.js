const { sequelize } = require("../models");
const { avgRatingsBookQuery } = require("./queries");

const filterBooksQuery = (searchObject) => {
  let obj = {
    where: {},
  };

  const { author, category, ratings } = searchObject;

  if (ratings) {
    obj.where.ratings = sequelize.literal(
      `${avgRatingsBookQuery} >= ${ratings}`
    );
  }

  if (author) {
    obj.where.author_id = author;
  }

  if (category) {
    obj.where.category_id = category;
  }

  return obj.where;
};

module.exports = {
  filterBooksQuery,
};
