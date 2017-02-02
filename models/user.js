module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Giving the Author model a name of type STRING
    	name: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
		description: DataTypes.STRING
  },
  // Here we'll pass a second "classMethods" object into the define method
  // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          Users.hasMany(models.Friends);
          Users.belongsToMany(Users, {
          	as: 'Friend',
          	through: 'Friends'
          });
        }
      }
    });
  return Users;
};


/*



module.exports = function(sequelize, DataTypes){
	var users = sequelize.define('users', {
		name: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
		description: DataTypes.STRING
	},
	{
		classMethod: {
			associate: function(models) {
				users.hasMany(models.friends);
				//users.hasMany(models.friends, {as: "friendID"});
				//users.hasMany(models.messages, {as: "userID"});
				//users.hasMany(models.messages, {as: "friendID"});
			}
		}

	});
	return users;
}

*/