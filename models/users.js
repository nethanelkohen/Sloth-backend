"use strict";
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

  return User;
};
