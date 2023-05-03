const { Controller } = require('egg');

// 单词校验规则
const vWord = {
  word: 'string',
  explains: 'string',
  phonetic: 'string',
  speak: 'string?',
  levelId: 'int?',
  unitId: 'int?',
};

// 单词列表校验规则  添加一个data字段使之符合语法
const vWordList = {
  data: {
    type: 'array',
    itemType: 'object',
    rule: vWord,
  },
};


class WordController extends Controller {
// app/controller/posts.js
  async list() {
    const { ctx } = this;
    console.log('@@@@', ctx.params);
    // 参数校验
    ctx.validate({
      unitId: 'int?', // type: int, required: false
    }, ctx.params);

    // 业务处理
    const unitId = ctx.params.unitId;
    let data;
    if (unitId) {
      data = await ctx.service.word.getWordsByUnitId(unitId);
    } else {
      const user = await ctx.service.user.getUserInfo();
      data = await ctx.service.word.getWordsByLevelId(user.levelId);

    }
    console.log('res***********', data);

    ctx.body = {
      status: true,
      mas: 'ok',
      data,
    };
  }

  // 添加单词
  async create() {
    const { ctx } = this;
    // validate
    ctx.validate(vWordList, { data: ctx.request.body });

    const res = await ctx.service.word.createWords(ctx.request.body);
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

module.exports = WordController;
