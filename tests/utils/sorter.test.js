const { sortBooksQuery, sortReviewsQuery } = require("../../utils/sorter");
const { minDiscountPriceQueryCoalesce } = require("../../utils/queries");
const { sequelize } = require("../../models");

describe("Sorter function", () => {
  test("should be able to produce the correct sort criteria for books", () => {
    const sortCriteria0 = "N/a";
    const sortCriteria1 = "popularity";
    const sortCriteria2 = "onsale";
    const sortCriteria3 = "priceasc";
    const sortCriteria4 = "pricedesc";

    const orderCriteria0 = sortBooksQuery(sortCriteria0);
    const orderCriteria1 = sortBooksQuery(sortCriteria1);
    const orderCriteria2 = sortBooksQuery(sortCriteria2);
    const orderCriteria3 = sortBooksQuery(sortCriteria3);
    const orderCriteria4 = sortBooksQuery(sortCriteria4);

    expect(orderCriteria0).toEqual(
      sequelize.literal(
        `(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.book_id = books.id) DESC`
      )
    );

    expect(orderCriteria1).toEqual(
      sequelize.literal(
        `(SELECT COUNT(reviews.id) FROM reviews WHERE reviews.book_id = books.id) DESC`
      )
    );

    expect(orderCriteria2).toEqual(
      sequelize.literal(
        `books.book_price - ${minDiscountPriceQueryCoalesce} DESC`
      )
    );

    expect(orderCriteria3).toEqual(
      sequelize.literal(`${minDiscountPriceQueryCoalesce} ASC`)
    );

    expect(orderCriteria4).toEqual(
      sequelize.literal(`${minDiscountPriceQueryCoalesce} DESC`)
    );
  });

  test("should be able to produce the correct sort criteria for reviews", () => {
    const sortCriteria0 = "N/a";
    const sortCriteria1 = "datedesc";
    const sortCriteria2 = "dateasc";

    const orderCriteria0 = sortReviewsQuery(sortCriteria0);
    const orderCriteria1 = sortReviewsQuery(sortCriteria1);
    const orderCriteria2 = sortReviewsQuery(sortCriteria2);

    expect(orderCriteria0).toEqual(sequelize.literal(`review_date DESC`));

    expect(orderCriteria1).toEqual(sequelize.literal(`review_date DESC`));

    expect(orderCriteria2).toEqual(sequelize.literal(`review_date ASC`));
  });
});
