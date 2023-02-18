const sequelize = require("sequelize");

// This subquery is to calculate the best discount price for a book
const minDiscountPriceQueryCoalesce = `
COALESCE (
    (SELECT MIN(discounts.discount_price) 
    FROM discounts 
    WHERE discounts.book_id = books.id 
    AND discount_start_date <= CURRENT_DATE
    AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)),
    books.book_price
)
`;

// This subquery is to calculate the average ratings of a book
const avgRatingsBookQuery = `
  COALESCE ((SELECT AVG (CAST (reviews.rating_start AS float))::numeric (10, 1) FROM reviews WHERE books.id = reviews.book_id), 0)
`;

// This function is to generate a subquery which will calculate
// the number of reviews of each ratings ranging from 1 to 5
const generateGetNumberOfReviewsQuery = (ratings, bookID) => {
  return sequelize.literal(`(SELECT COUNT(reviews.id) FROM reviews WHERE 
(CAST (reviews.rating_start AS integer)) = ${ratings} AND reviews.book_id = ${bookID})`);
};

module.exports = {
  minDiscountPriceQueryCoalesce,
  avgRatingsBookQuery,
  generateGetNumberOfReviewsQuery,
};
