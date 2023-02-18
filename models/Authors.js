module.exports = (sequelize, DataTypes) => {
  const Authors = sequelize.define(
    "authors",
    {
      author_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author_bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { timestamps: false, tableName: "authors" }
  );

  Authors.associate = (models) => {
    Authors.hasMany(models.books, {
      onDelete: "cascade",
      foreignKey: { field: "author_id", allowNull: false },
    });
  };

  return Authors;
};
