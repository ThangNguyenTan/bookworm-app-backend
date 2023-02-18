module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define(
    "order_items",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "order_items" }
  );

  OrderItems.associate = (models) => {
    OrderItems.belongsTo(models.books, {
      onDelete: "cascade",
      foreignKey: { field: "book_id", allowNull: false },
    });

    OrderItems.belongsTo(models.orders, {
      onDelete: "cascade",
      foreignKey: { field: "order_id", allowNull: false },
    });
  };

  return OrderItems;
};
