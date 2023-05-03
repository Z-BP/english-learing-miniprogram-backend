// 单词消消乐数据
'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const EliminateWords = app.model.define('eliminate_words', {
    userId: {
      type: INTEGER, primaryKey: true,
      // references: {
      //   model: app.model.User,
      //   key: 'id',
      // },
    },
    unitId: {
      type: INTEGER, primaryKey: true,
    },
    finishDuration: {
      type: INTEGER,
      comment: '完成时间 单位 s',
    },


  }, {
    tableName: 'eliminate_words',
  });
  EliminateWords.associate = function() {
    // 定义外键约束
    app.model.EliminateWords.belongsTo(app.model.Unit, {
      foreignKey: 'unitId',
    });
    app.model.Unit.hasMany(app.model.EliminateWords);

    app.model.EliminateWords.belongsTo(app.model.User, {
      foreignKey: 'userId',
    });
    app.model.User.hasMany(app.model.EliminateWords);
  };


  return EliminateWords;
};

