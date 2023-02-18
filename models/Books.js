module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define(
    "books",
    {
      book_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      book_summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      book_price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      book_cover_photo: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "books" }
  );

  Books.associate = (models) => {
    Books.belongsTo(models.authors, {
      onDelete: "cascade",
      foreignKey: { field: "author_id", allowNull: false },
    });

    Books.belongsTo(models.categories, {
      onDelete: "cascade",
      foreignKey: { field: "category_id", allowNull: false },
    });

    Books.hasMany(models.discounts, {
      onDelete: "cascade",
      foreignKey: { field: "book_id", allowNull: false },
    });

    Books.hasMany(models.order_items, {
      onDelete: "restrict",
      foreignKey: { field: "book_id", allowNull: false },
    });

    Books.hasMany(models.reviews, {
      onDelete: "cascade",
      foreignKey: { field: "book_id", allowNull: false },
    });
  };

  return Books;
};
