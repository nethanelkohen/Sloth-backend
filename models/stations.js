"use strict";
module.exports = (sequelize, DataTypes) => {
  var Station = sequelize.define("Station", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    station: DataTypes.STRING,
    status: DataTypes.STRING
  });

  return Station;
};
