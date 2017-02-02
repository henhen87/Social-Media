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
          Friends.belongsTo(models.Users,
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

/*



module.exports = function(sequelize, DataTypes){
  var friends = sequelize.define('friends', {
    status: DataTypes.STRING,
    friendID: DataTypes.INTEGER
  },

  {
    classMethods: {
      associate: function(models) {
        //we're adding two constraints here. Both friendID and userID have to be IDs in the user table, otherwise an insert will FAIL.
        //the onDelete cascade will remove both records of the user's friends and other users that have that first user as a friend.
        friends.belongsTo(models.users, {
              onDelete: "cascade",
              foreignKey: {
                allowNull: false
              }
        });

        friends.belongsTo(models.users, {
            foreignKey: 'friendID',
            targetKey: 'id', 
            allowNull: false, 
            onDelete: "cascade"
        });

      }
    }

  });
  return friends;

}
*/