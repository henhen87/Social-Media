module.exports = function(sequelize, DataTypes){
	var users = sequelize.define('Users', {
		name: DataTypes.STRING,
		userName: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
		description: DataTypes.STRING
	},
	{
		classMethod: {
			associate: function(models) {
				users.hasMany(models.Friends, {as: "userID"});
				users.hasMany(models.Friends, {as: "friendID"});
			}
		}

	});
	return users;
}