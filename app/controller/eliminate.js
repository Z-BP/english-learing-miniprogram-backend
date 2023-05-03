// 消消乐游戏相关
const { Controller } = require('egg');
const { Sequelize } = require('sequelize');


// 校验规则
const vItem = {
  userId: 'int?',
  unitId: 'int',
  finishDuration: 'int',
};


class EliminateController extends Controller {
  // 返回用户当前等级下的所有消消乐数据
  async list() {
    const { ctx } = this;
    const user = await ctx.service.user.getUserInfo();
    // const data = await ctx.model.EliminateWords.findAll({
    //   where: {
    //     userId: user.id,
    //     '$Unit.level_id$': user.levelId,
    //   },
    //   include: [{
    //     model: ctx.model.Unit,
    //     as: 'Unit',
    //   }],
    // });
    const data = await ctx.model.Unit.findAll({
      where: {
        levelId: user.levelId,
      },
      include: [{
        model: ctx.model.EliminateWords,
        where: {
          userId: user.id,
          unitId: Sequelize.col('unit.id'),
        },
        required: false, // 开启左外连接
      }],
    });


    ctx.body = {
      status: true,
      mas: 'ok',
      data,
    };
  }

  // 添加消消乐数据
  async create() {
    const { ctx } = this;
    // validate
    ctx.validate(vItem, ctx.request.body);


    const data = {
      userId: ctx.state.user.id,
      ...ctx.request.body,
    };

    // 查找是否存在
    const res = await ctx.service.eliminate.createOrUpdateItem(data);
    if (!res) {
      ctx.body = {
        status: false,
        msg: '添加或修改数据失败',
      };
    }
    ctx.body = {
      status: true,
      msg: 'ok',

    };
  }


}

module.exports = EliminateController;
