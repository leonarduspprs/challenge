'use strict';
module.exports = (sequelize, DataTypes) => {
  const bukuseqq = sequelize.define('bukuseqq', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publish_date: DataTypes.DATE,
    pages: DataTypes.INTEGER,
    language: DataTypes.STRING,
    publisher_id: DataTypes.STRING
  }, {});
  bukuseqq.associate = function(models) {
    // associations can be defined here
  };
  return bukuseqq;
};
