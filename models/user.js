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
  return Users;
};