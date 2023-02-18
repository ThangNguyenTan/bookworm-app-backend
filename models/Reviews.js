module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    "reviews",
    {
      review_title: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      review_details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      review_date: {
        type: 'TIMESTAMP',
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      rating_start: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "reviews" }
  );

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.books, {
      onDelete: "cascade",
      foreignKey: { field: "book_id", allowNull: false },
    });
  };

  return Reviews;
};
