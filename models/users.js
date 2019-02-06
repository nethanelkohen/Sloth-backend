"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    expo_token: DataTypes.STRING,
    home_station: DataTypes.STRING,
    onboarding_completed: DataTypes.STRING,
    notifications_setting: DataTypes.STRING
  });

  User.beforeCreate(user => {
    return bcrypt
      .hash(user.password, 10)
      .then(hash => (user.password = hash))
      .catch(err => {
        throw new Error();
      });
  });

  User.prototype.comparePassword = async function(password) {
    return bcrypt.compareSync(password, this.password).catch(err => {
      throw new Error();
    });
  };

  return User;
};
