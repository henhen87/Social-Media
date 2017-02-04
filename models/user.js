var bcrypt = require('bcryptjs')

module.exports = function(sequelize, DataTypes){
	var users = sequelize.define('users', {
		name: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
		description: DataTypes.STRING
	}, {
		//Instance methods can only be used when certain instances of sequelized are used such as create. Not
		//all instances of sequelize can use instance methods.
		classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          users.hasMany(models.events);
          users.hasMany(models.Friends);
          users.belongsToMany(users, {
          	as: 'Friend',
          	through: 'Friends'
          });
          users.hasMany(models.Messages);
          users.belongsToMany(users, {
          	as: 'Sender',
          	through: 'Messages',
          	unique: false
          });

        }
      },


		instanceMethods: {
			passwordVerify: function(userPW, hash, callback){
				//the parameter userPW and hash are both passwords passed in from the passport Localstrategy
				return bcrypt.compare(userPW, hash, function(err, res) { //res is the result after comparison. Boolean value
						    if (err) throw err;
						    callback(null, res);
						});
			}
		}, 
	
		hooks: {
			beforeCreate: function(user, options){
				return new Promise(function(resolve, reject){
					bcrypt.genSalt(10, function(err, salt) {
					    bcrypt.hash(user.password, salt, function(err, hash) {
					    	if (err) {reject(err)}
					        user.password = hash;
					    	console.log(user.password);
					    	resolve();
					    });
					});
				})
			}
		}
	});
	return users;
}
