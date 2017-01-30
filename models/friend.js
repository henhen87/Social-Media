module.exports = function(sequelize, DataTypes){
	var friends = sequelize.define('Friends', {
		status: DataTypes.STRING
	},

    {
      classMethods: {
        associate: function(models) {
          //we're adding two constraints here. Both friendID and userID have to be IDs in the user table, otherwise an insert will FAIL.
          //the onDelete cascade will remove both records of the user's friends and other users that have that first user as a friend.
          friends.belongsTo(models.Users, {
            	foreignKey: 'userID',
            	targetKey: 'id', 
            	allowNull: false, 
            	onDelete: "cascade"
          });

          friends.belongsTo(models.Users, {
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