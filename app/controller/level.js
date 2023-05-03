const { Controller } = require('egg');
const sequelize = require('sequelize');
const vLevel = {
  title: 'string',
};

const vLevelList = {
  data: {
    type: 'array',
    itemType: 'object',
    rule: vLevel,
  },
};

class LevelController extends Controller {
  // 返回所有level信息
  async index() {
    const { ctx } = this;
    // 业务处理
    const data = await ctx.model.Level.findAll();

    ctx.body = {
      status: true,
      mas: 'ok',
      data,
    };
  }

  // 获取level下的unit数据
  async getUnits() {
    const { ctx } = this;
    const { levelId } = await ctx.service.user.getUserInfo();
    const data = await ctx.model.Unit.findAll({
      attributes: [ 'id', 'title', 'levelId', [ sequelize.literal(`(
        SELECT COUNT(*)
        FROM words AS word
        WHERE
        word.unit_id = unit.id
    )`), 'wordCount' ]],
      where: {
        levelId,
      },
    });

    if (!data[0]) {
      ctx.body = {
        status: false,
        msg: 'false',
        data,
      };
    }

    ctx.body = {
      status: true,
      msg: 'ok',
      data,
    };
  }

  // 添加level
  async create() {
    const { ctx } = this;
    // validate
    console.log('ddddddd', ctx.request.body);
    ctx.validate(vLevelList, { data: ctx.request.body });

    const res = await ctx.service.level.createLevels(ctx.request.body);
    if (!res) {
      ctx.body = {
        status: false,
        msg: '添加数据失败',
      };
    }
    ctx.body = {
      status: true,
      msg: 'ok',

    };
  }
}

module.exports = LevelController;
