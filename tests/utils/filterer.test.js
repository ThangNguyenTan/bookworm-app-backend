const { filterBooksQuery } = require("../../utils/filterer");
const { avgRatingsBookQuery } = require("../../utils/queries");
const { sequelize } = require("../../models");

describe("Filter function", () => {
  test("should be able to produce the correct where object", () => {
    const searchObject = {
      author: 1,
      category: 2,
      ratings: 3,
    };
    const whereObj = filterBooksQuery(searchObject);

    expect(whereObj).toMatchObject({
      author_id: 1,
      category_id: 2,
      ratings: sequelize.literal(`${avgRatingsBookQuery} >= 3`),
    });
  });
});
