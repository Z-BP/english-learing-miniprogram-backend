/* eslint valid-jsdoc: "off" */

'use strict';


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1681715216592_2872';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // flag to enable your handler ?
  config.errorHandler = {
    enable: true,
    // match: '/user/findUserByUserId',
    // ignore: '/user/findUserByUserId',
  };


  // add plugin config
  // jwt
  config.jwt = {
    secret: '123456',
    expiresIn: '24h',
    // match: [ '/user/register', '/user/info' ], // 没有生效？
  };
  // 参数校验
  config.validate = {
    enable: true,
    package: 'egg-validate',
    convert: true, // 允许在验证时进行类型转换
    widelyUndefined: true, // convert empty string(''), NaN, Null to undefined, this option can make rule.required more powerful, default to false.This may change the original input params.
  };

  // sql
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    // database: 'egg_database',
    database: 'my_app',
  };

  // 密码加密
  config.bcrypt = {
    saltRounds: 10,
  };

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
