// 消消乐游戏相关
const { Controller } = require('egg');
const { Sequelize } = require('sequelize');


// 校验规则
const vItem = {
  wordId: 'int',
  enToCn: 'boolean',
  cnToEn: 'boolean',
  spelling: 'boolean',
};

const vList = {
  data: {
    type: 'array',
    itemType: 'object',
    rule: vItem,
  },
};


class ExerciseController extends Controller {

  // 返回用户当前等级下的所有unit的单词练习数据
  async list() {
    const { ctx } = this;
    const user = await ctx.service.user.getUserInfo();
    console.log('exercise list');


    // 数据库多表连接查询
    let data = await ctx.model.Unit.findAll({
      attributes: [[ 'id', 'unitId' ], 'title' ],
      where: {
        levelId: user.levelId,
      },
      include: [
        {
          model: ctx.model.Word,
          attributes: [[ 'id', 'wordId' ], 'word', 'explains', 'phonetic' ],
          where: {
            unitId: Sequelize.col('unit.id'),
          },
          include: {
            model: ctx.model.ExerciseWords,
            attributes: {
              exclude: [ 'createdAt', 'updatedAt', 'userId', 'wordId' ],
            },

            where: {
              userId: user.id,
              wordId: Sequelize.col('words.id'),
            },
            required: false, // 开启外连接
          },
        },
      ],
    });

    // 数据处理
    data = data.map(item1 => {
      item1.dataValues.words = item1.words.map(item2 => {
        item2.dataValues.exercise_words = item2.dataValues.exercise_words[0] || {};
        return item2;
      });
      return item1;
    });
    ctx.body = {
      status: true,
      mas: 'ok',
      data,
    };
  }

  // 添加单词练习数据
  async create() {
    const { ctx } = this;
    // validate

    console.log('33333333333333', ctx.request.body);
    ctx.validate(vList, { data: ctx.request.body });


    const data = ctx.request.body.map(item => {
      return {
        userId: ctx.state.user.id,
        ...item,
      };
    });

    // console.log('data', data, ctx.request.body);
    const res = await ctx.service.exercise.createOrUpdateItems(data);
    if (!res.status) {
      ctx.body = {
        status: false,
        msg: '添加数据失败',
        data: res.data,
      };
    }
    ctx.body = {
      status: true,
      msg: 'ok',
    };
  }


}

module.exports = ExerciseController;
