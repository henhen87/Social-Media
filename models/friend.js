module.exports = function(sequelize, DataTypes) {
  var Friends = sequelize.define("Friends", {
    status: DataTypes.STRING
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // When we delete an Author, we'll also delete their Posts "cascade"
          // An Author (foreignKey) is required or a Post can't be made
          Friends.belongsTo(models.users,
            {
              onDelete: "cascade",
              foreignKey: {
                allowNull: false
              }
            });
        }
      }
    });
  return Friends;
};
