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
				users.hasMany(models.friends, {as: "userID"});
				users.hasMany(models.friends, {as: "friendID"});
				users.hasMany(models.messages, {as: "userID"});
				users.hasMany(models.messages, {as: "friendID"});
			}
		}

	});
	return users;
}