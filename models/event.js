module.exports = function(sequelize, DataTypes){
	var events = sequelize.define('events',{
		userId: DataTypes.INTEGER,
		friendsId: DataTypes.INTEGER
	});
	return events;
}