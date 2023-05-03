# my-app-backend

毕设儿童英语学习小程序 后端程序

## QuickStart

### database

1. 需要在 config/config.default.js 文件中修改 sequelize 配置

```
  // sql
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'my_app',
  };
```

2. 在 app.js 文件中开启数据库表同步

```
  async didLoad() {
    // 请将你的插件项目中 app.beforeStart 中的代码置于此处。
    if (this.app.config.env === 'local' || this.app.config.env === 'unittest') {
      await this.app.model.sync({ alter: true });
    }
  }
```

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org


