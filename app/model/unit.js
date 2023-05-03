'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Unit = app.model.define('unit', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: {
      type: STRING(32),
      allowNull: false,
      unique: true,
      comment: '单元名',
    },
    levelId: {
      type: INTEGER,
      comment: '单元对应的等级id',
    },

  });
  Unit.associate = function() {
    app.model.Unit.belongsTo(app.model.Level);
    app.model.Level.hasMany(app.model.Unit, {
      foreignKey: 'levelId',
    });
  };
  return Unit;
};
