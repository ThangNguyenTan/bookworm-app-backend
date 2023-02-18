const {
  generateGetNumberOfReviewsQuery,
  avgRatingsBookQuery,
} = require("../utils/queries");
const { books: Books } = require("../models");

// This function get all of the length of each reviews rating
// and the average ratings of a specific book
const getReviewsStatus = async (bookID) => {
  // Create count query for each rating type from 1 to 5
  const q1 = generateGetNumberOfReviewsQuery(1, bookID);
  const q2 = generateGetNumberOfReviewsQuery(2, bookID);
  const q3 = generateGetNumberOfReviewsQuery(3, bookID);
  const q4 = generateGetNumberOfReviewsQuery(4, bookID);
  const q5 = generateGetNumberOfReviewsQuery(5, bookID);

  let reviewsStatus = await Books.findAll({
    where: {
      id: bookID,
    },
    attributes: [
      [q1, "numberOf1StarReviews"],
      [q2, "numberOf2StarReviews"],
      [q3, "numberOf3StarReviews"],
      [q4, "numberOf4StarReviews"],
      [q5, "numberOf5StarReviews"],
      [avgRatingsBookQuery, "ratings"],
    ],
  });

  // If the reviewsStatus is empty
  // We generate a default pattern for the client-site to behave normally
  if (reviewsStatus.length === 0) {
    reviewsStatus.push({
      book_id: bookID,
      numberOf1StarReviews: 0,
      numberOf2StarReviews: 0,
      numberOf3StarReviews: 0,
      numberOf4StarReviews: 0,
      numberOf5StarReviews: 0,
      ratings: "0",
    });
  }

  return reviewsStatus;
};

module.exports = {
  getReviewsStatus,
};
