'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Word = app.model.define('word', {
    id: {
      type: INTEGER, primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: STRING(32),
      allowNull: false,
      unique: true,
      comment: '单词值 唯一',
    },
    explains: {
      type: STRING,
      allowNull: false,
      comment: '单词释义，按词性划分为item [item]',
    },
    phonetic: {
      type: STRING,
      comment: '单词音标',
    },
    speak: {
      type: STRING,
      comment: '单词音频url',
    },
    levelId: {
      type: INTEGER,
      comment: '单词对应level的id',
    },
    unitId: {
      type: INTEGER,
      comment: '单词对应unit的id',
    },


  });
  Word.associate = function() {
    app.model.Word.belongsTo(app.model.Unit);
    app.model.Unit.hasMany(app.model.Word, {
      foreignKey: 'unitId',
    });

    app.model.Word.belongsTo(app.model.Level);
    app.model.Level.hasMany(app.model.Word, {
      foreignKey: 'levelId',
    });
  };
  return Word;
};
