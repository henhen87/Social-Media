module.exports = function(sequelize, DataTypes){
  var messages = sequelize.define('messages', {
    message: DataTypes.TEXT,
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },

  {
    classMethods: {
      associate: function(models) {
        messages.belongsTo(models.users, {
            foreignKey: 'userID',
            targetKey: 'id', 
            allowNull: false, 
            onDelete: "cascade"
        });

        messages.belongsTo(models.users, {
            foreignKey: 'friendID',
            targetKey: 'id', 
            allowNull: false, 
            onDelete: "cascade"
        });

      }
    }

  });
  return messages;

}