
const { Service } = require('egg');

class EliminateService extends Service {


  // 添加单条数据
  async createOrUpdateItem(data) {
    const { ctx } = this;

    const item = await ctx.model.EliminateWords.findOne({
      where: {
        userId: data.userId,
        unitId: data.unitId,
      },
    });
    let res;
    if (item) {
      res = await item.update({
        finishDuration: data.finishDuration,
      });
    } else {
      res = await ctx.model.EliminateWords.create(data);
    }

    if (!res || !res[0]) {
      return false;
    }
    return true;
  }


}

module.exports = EliminateService;
