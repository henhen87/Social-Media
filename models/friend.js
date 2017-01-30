module.exports = function(sequelize, DataTypes){
	var friends = sequelize.define('Friends', {
		//friendID: DataTypes.INTEGER,
		status: DataTypes.STRING
	},

    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // When we delete an Author, we'll also delete their Posts "cascade"
          // An Author (foreignKey) is required or a Post can't be made
          friends.belongsTo(models.Users, {
            	foreignKey: 'user_id', 
            	targetKey: 'id', 
            	allowNull: false, 
            	onDelete: "cascade"
          }, {
          		foreignKey: 'friend_id', 
            	targetKey: 'id', 
            	allowNull: false, 
            	onDelete: "cascade"
          });
        }
      }

	});
	return friends;

}