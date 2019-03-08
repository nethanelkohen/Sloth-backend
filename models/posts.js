"use strict";
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    direction: DataTypes.STRING,
    station: DataTypes.STRING,
    status_update: DataTypes.STRING,
    comments: DataTypes.STRING,
    photo: DataTypes.STRING,
    vetting_score: DataTypes.INTEGER
  });

  // Post.associate = function(models) {
  //   this.belongsTo(models.Station, {
  //     as: "station_key",
  //     foreignKey: "station"
  //   });
  // };

  return Post;
};
