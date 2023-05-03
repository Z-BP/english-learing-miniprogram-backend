// 单词消消乐数据
'use strict';

module.exports = app => {
  const { INTEGER, BOOLEAN } = app.Sequelize;
  const ExerciseWords = app.model.define('exercise_words', {
    userId: {
      type: INTEGER, primaryKey: true,
    },
    wordId: {
      type: INTEGER, primaryKey: true,
    },
    enToCn: {
      type: BOOLEAN,
      comment: '英译中 是否做对',
    },
    cnToEn: {
      type: BOOLEAN,
      comment: '中译英 是否做对',
    },
    spelling: {
      type: BOOLEAN,
      comment: '单词拼写 是否做对',
    },


  }, {
    tableName: 'exercise_words',
  });
  ExerciseWords.associate = function() {
    // 定义外键约束
    app.model.ExerciseWords.belongsTo(app.model.User, {
      foreignKey: 'userId',
    });
    app.model.User.hasMany(app.model.ExerciseWords);


    app.model.ExerciseWords.belongsTo(app.model.Word, {
      foreignKey: 'wordId',
    });
    app.model.Word.hasMany(app.model.ExerciseWords);
  };


  return ExerciseWords;
};

