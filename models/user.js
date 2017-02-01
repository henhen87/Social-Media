var bcrypt = require('bcryptjs')

module.exports = function(sequelize, DataTypes){
	var users = sequelize.define('users', {
		name: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
		description: DataTypes.STRING
	}, {
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

   // bcrypt.hash(user.password, 8, (err, data) => {
   //            if (err) reject(err);
   //            user.password = data;
   //            resolve();
   //          })

// module.exports = function(sequelize, DataTypes){
// 	var users = sequelize.define('users', {
// 		name: DataTypes.STRING,
// 		username: DataTypes.STRING,
// 		password: DataTypes.STRING,
// 		email: DataTypes.STRING,
// 		description: DataTypes.STRING
// 	}, {
// 		freezeTableName: True, 
// 		instanceMethods: {
// 			bcrypt.genSalt(10, function(err, salt) {
// 			    bcrypt.hash(password, salt, function(err, hash) {
// 			        password = hash;
// 			    });
// 			});
// 		}
// 	});
// 	return users;
// }