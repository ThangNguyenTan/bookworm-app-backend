module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "categories",
    {
      category_name: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      category_desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false, tableName: "categories" }
  );

  Categories.associate = (models) => {
    Categories.hasMany(models.books, {
      onDelete: "cascade",
      foreignKey: { field: "category_id", allowNull: false },
    });
  };

  return Categories;
};
