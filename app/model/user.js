'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userName: {
      type: STRING(32), // mysql 建立索引有767bytes长度限制
      allowNull: false,
      unique: true,
      comment: '用户名，唯一',
    },
    passWord: STRING,
    levelId: {
      type: INTEGER,
    },
  });

  User.associate = function() {
    app.model.User.belongsTo(app.model.Level);
    app.model.Level.hasMany(app.model.User, {
      foreignKey: 'levelId',
    });
  };
  // User.sync();
  return User;
};
