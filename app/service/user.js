const bcrypt = require('bcryptjs');

const { Service } = require('egg');


class UserService extends Service {
// 检查用户名
  async checkUserName(query) {
    const { userName } = query;
    const users = await this.ctx.model.User.findAll({
      attributes: [ 'userName' ],
      where: { userName },
    });
    return users;
  }


  // 用户注册
  async register(body) {
    const { userName, passWord } = body;
    // 对密码加密
    const hash = await bcrypt.hash(passWord, this.config.bcrypt.saltRounds);
    const user = await this.ctx.model.User.create({ userName, passWord: hash });
    return user;
  }


  // 用户登陆
  async Login(body) {
    const { ctx } = this;
    const { userName, passWord } = body;
    // 根据用户名查询用户信息
    const user = await this.ctx.model.User.findOne({
      where: { userName },
    });
    if (!user) return false;
    // 进行密码的比对
    const match = await bcrypt.compare(passWord, user.passWord);
    if (match) {
      // 比对通过
      const { id, userName, levelId } = user;
      // 获取jwt配置
      const { jwt: { secret, expiresIn } } = this.app.config;
      // 生成token
      const token = this.app.jwt.sign({
        id, userName,
      }, secret, { expiresIn });

      // 查询用户信息返回
      const res = await ctx.model.Level.findOne({
        attributes: [[ 'title', 'levelTitle' ]],
        where: {
          id: levelId,
        },
      });
      return { id, userName, levelId, token, levelTitle: res.dataValues.levelTitle };
    }
  }

  async getUserInfo() {
    const { ctx } = this;
    const id = ctx.state.user.id; // 获取token中的user id
    const user = await ctx.model.User.findByPk(id);
    if (!user) return;
    return {
      id: user.id,
      userName: user.userName,
      levelId: user.levelId,
    };
  }

  // 设置用户学习等级
  async setLevel(levelId) {
    const { ctx } = this;
    const id = ctx.state.user.id; // 获取token中的user id
    // 更新数据库
    const res = await ctx.model.User.update({
      levelId,
    }, {
      where: {
        id,
      },
    });
    // res {[number]}
    // res[0] === 0 代表影响了0行
    if (!res[0]) {
      return false;
    }
    return true;
  }
}

module.exports = UserService;
