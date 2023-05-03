'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  const { jwt } = app;
  // user 相关
  router.post('/user/register', controller.user.register); // 用户注册
  router.post('/user/login', controller.user.login); // 用户登陆
  router.get('/user/info', jwt, controller.user.info); // 获取用户信息
  router.put('/user/level/:levelId', jwt, controller.user.level); // 设置用户学习内容等级


  // word 相关
  router.get('/words', jwt, controller.word.list); // 获取用户当前level单词列表
  router.get('/words/:unitId', jwt, controller.word.list); // 获取用户当前level下的unit单词列表
  router.post('/words', jwt, controller.word.create); // 增加单词


  // level 相关
  router.get('/levels', controller.level.index); // 获取所有level
  router.get('/levels/units', jwt, controller.level.getUnits); // 获取用户当前level下的所有units
  router.post('/levels', jwt, controller.level.create); // 添加level


  // unit 相关
  router.post('/units', jwt, controller.unit.create); // 添加unit

  // eliminate words 单词消消乐相关
  router.get('/eliminate', jwt, controller.eliminate.list); // 获取用户当前等级下的消消乐数据
  router.post('/eliminate', jwt, controller.eliminate.create); // 设置用户某unit下的消消乐数据


  // exercise words 单词练习相关
  router.post('/exercise', jwt, controller.exercise.create); // 添加单词练习数据
  router.get('/exercise/unit', jwt, controller.exercise.list); // 查询用户当前等级下对应所有unit的单词练习数据


  router.post('/video', jwt, controller.video.create); // 添加视频资源
  router.get('/video', jwt, controller.video.list); // 获取用户对应等级的视频数据
};
