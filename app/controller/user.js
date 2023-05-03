// 校验用户注册参数
const vUser = {
  userName: { type: 'string', required: true },
  passWord: { type: 'string', required: true },
};

const { Controller } = require('egg');


class UserController extends Controller {
  // 用户注册
  async register() {
    const { ctx } = this;
    // 接收并校验参数
    ctx.validate(vUser, ctx.request.body);
    // 判断用户名是否重复
    const users = await ctx.service.user.checkUserName(ctx.request.body);
    if (users[0]) {
      ctx.body = { status: false, msg: '用户名已存在', data: users };
      return;
    }
    await ctx.service.user.register(ctx.request.body);
    ctx.body = { status: true, msg: '注册成功' };
  }

  // 用户登陆
  async login() {
    const { ctx } = this;
    // 接收并校验参数
    ctx.validate(vUser, ctx.request.body);
    const data = await ctx.service.user.Login(ctx.request.body);
    if (!data) {
      console.log('login: data', data);
      ctx.status = 401;
      ctx.body = { status: false, msg: '用户名或密码错误' };
      return;
    }
    ctx.body = { status: true, msg: '登陆成功', data };
  }

  async update() {
    const { ctx } = this;
    const userToken = ctx.state.user;
    console.log('userToken', userToken);


    ctx.body = '2';
  }

  async info() {
    const { ctx } = this;
    const user = await ctx.service.user.getUserInfo();
    if (!user) {
      ctx.body = {
        status: false,
        msg: '用户信息不存在',
      };
    }
    console.log('user', user);
    ctx.body = {
      status: true,
      msg: 'ok',
      data: user,
    };
  }

  async level() {
    const { ctx } = this;
    // 参数校验
    ctx.validate({
      levelId: 'int',
    }, ctx.params);

    // 业务处理;
    const res = await ctx.service.user.setLevel(ctx.params.levelId);
    if (!res) {
      ctx.body = {
        status: false,
        mag: '设置用户level失败',
      };
      return;
    }
    ctx.body = {
      status: true,
      msg: 'ok',
    };
  }
}

module.exports = UserController;
