'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Video = app.model.define('video', {
    id: {
      type: INTEGER, primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(32),
      allowNull: false,
      comment: '标题',
    },
    cover: {
      type: STRING,
      comment: '视频封面照url',
    },
    src: {
      type: STRING,
      comment: '视频资源url',
    },
    levelId: {
      type: INTEGER,
      comment: '资源对应的level',
    },


  });
  Video.associate = function() {
    app.model.Video.belongsTo(app.model.Level);
    app.model.Level.hasMany(app.model.Video, {
      foreignKey: 'levelId',
    });
  };
  return Video;
};
