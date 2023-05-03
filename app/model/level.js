'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Level = app.model.define('level', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: {
      type: STRING(32),
      allowNull: false,
      unique: true,
      comment: '等级名',
    },
  });


  return Level;
};
