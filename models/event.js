module.exports = function(sequelize, DataTypes){
	var events = sequelize.define('events',{
		body: DataTypes.STRING
	},{
		 classMethods: {
        associate: function(models) {
          // When we delete an Author, we'll also delete their Posts "cascade"
          // An Author (foreignKey) is required or a Post can't be made

          events.belongsTo(models.users,
            {
              onDelete: "cascade",
              foreignKey: {
                allowNull: false
              }
            });
        }
      }

	});
	return events;
}