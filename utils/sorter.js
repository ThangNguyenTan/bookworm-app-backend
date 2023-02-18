const sequelize = require("sequelize");
const { minDiscountPriceQueryCoalesce } = require("./queries");

const sortBooksQuery = (sortCriteria) => {
  let order = [];

  switch (sortCriteria) {
    case "popularity":
      order.push(
        sequelize.literal(
          `(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.book_id = books.id) DESC`
        ),
        sequelize.literal(`${minDiscountPriceQueryCoalesce} ASC`)
      );
      break;
    case "onsale":
      order.push(
        sequelize.literal(
          `books.book_price - ${minDiscountPriceQueryCoalesce} DESC`
        ),
        sequelize.literal(`${minDiscountPriceQueryCoalesce} ASC`)
      );
      break;
    case "priceasc":
      order.push(sequelize.literal(`${minDiscountPriceQueryCoalesce} ASC`));
      break;
    case "pricedesc":
      order.push(sequelize.literal(`${minDiscountPriceQueryCoalesce} DESC`));
      break;
    default:
      order.push(
        sequelize.literal(
          `(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.book_id = books.id) DESC`
        )
      );
      break;
  }

  return order;
};

const sortReviewsQuery = (sortCriteria) => {
  let order = "";

  switch (sortCriteria) {
    case "dateasc":
      order = sequelize.literal(`review_date ASC`);
      break;
    case "datedesc":
      order = sequelize.literal(`review_date DESC`);
      break;
    default:
      order = sequelize.literal(`review_date DESC`);
      break;
  }

  return order;
};

module.exports = {
  sortBooksQuery,
  sortReviewsQuery,
};
