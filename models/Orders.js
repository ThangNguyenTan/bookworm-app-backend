module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "orders",
    {
      order_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      order_amount: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "orders" }
  );

  Orders.associate = (models) => {
    Orders.hasMany(models.order_items, {
      onDelete: "cascade",
      foreignKey: { field: "order_id", allowNull: false },
    });
  };

  return Orders;
};
