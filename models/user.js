const bcrypt = require("bcryptjs");
const validator = require("validator");

module.exports = function (sequelize, DataTypes) {
   // creates the User Table 
   const User = sequelize.define("User", {
      email: {
         type: DataTypes.STRING, 
         allowNull: false, 
         unique: true
      }, 
      password: {
         type: DataTypes.STRING, 
         allowNull: false
      },
      name: {
         type: DataTypes.STRING, 
         allowNull: false
      },
      isFoodeeOwner: {
         type: DataTypes.BOOLEAN, 
         defualtValue: false, 
         allowNull: false
      }
   });
   
   // isEmail validation for the user email 
   User.hook("beforeValidate", function (user) {
      if (user.email.indexOf('@gmail.com') != -1) {
         return sequelize.Promise.resolve(user);
      }
      // isEmail validation 
      if (validator.isEmail(user.email)) {
         return sequelize.Promise.resolve(user);
      } else {
         return sequelize.Promise.reject('Validation Error:L invalid email');
      }
   });

   // User prototype method to check if our user password is valid
   User.prototype.validPassword = function (password) {
      return bcrypt.compareSync(password, this.password);
   };

   // pre table creation hook to hash the user password 
   User.hook("beforeCreate", function (user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12), null);
   });

   return User;
};