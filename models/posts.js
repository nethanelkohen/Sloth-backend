"use strict";
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    station: DataTypes.STRING,
    train: DataTypes.STRING,
    status_update: DataTypes.STRING,
    comments: DataTypes.STRING,
    photo: DataTypes.STRING,
    vetting_score: DataTypes.INTEGER
  });

  return Post;
};
