module.exports = function(sequelize, DataTypes){
	var events = sequelize.define('events',{
		movieTime: DataTypes.DATE,
		movieName: DataTypes.STRING,
		location: DataTypes.STRING,
		expire: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});
	return events;
}