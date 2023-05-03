const { Controller } = require('egg');
const vUnit = {
  title: 'string',
  levelId: 'int',
};

const vUnitList = {
  data: {
    type: 'array',
    itemType: 'object',
    rule: vUnit,
  },
};

class UnitController extends Controller {
  // 返回所有unit信息
  async index() {
    const { ctx } = this;
    // 业务处理
    const data = await ctx.model.Unit.findAll();
    console.log('res***********', data);

    ctx.body = {
      status: true,
      mas: 'ok',
      data,
    };
  }


  // 添加level
  async create() {
    const { ctx } = this;
    // validate
    console.log('ddddddd', ctx.request.body);
    ctx.validate(vUnitList, { data: ctx.request.body });

    const res = await ctx.service.unit.createUnits(ctx.request.body);
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

module.exports = UnitController;
