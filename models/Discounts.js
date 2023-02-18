module.exports = (sequelize, DataTypes) => {
  const Discounts = sequelize.define(
    "discounts",
    {
      discount_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      discount_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      discount_price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "discounts" }
  );

  Discounts.associate = (models) => {
    Discounts.belongsTo(models.books, {
      onDelete: "cascade",
      foreignKey: { field: "book_id", allowNull: false },
    });
  };

  return Discounts;
};
