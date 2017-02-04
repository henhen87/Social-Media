module.exports = function(sequelize, DataTypes) {
  var Messages = sequelize.define("Messages", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: DataTypes.STRING,
    message: DataTypes.TEXT
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // When we delete an Author, we'll also delete their Posts "cascade"
          // An Author (foreignKey) is required or a Post can't be made
          Messages.belongsTo(models.users,
            {
              onDelete: "cascade",
              unique: false
            });
        }
      }
    });
  return Messages;
};
