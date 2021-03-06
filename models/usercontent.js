'use strict';
module.exports = function(sequelize, DataTypes) {
  var userContent = sequelize.define('userContent', {
    name: DataTypes.STRING,
    data: DataTypes.STRING,
    dataType: DataTypes.STRING,
    pageID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userContent;
};