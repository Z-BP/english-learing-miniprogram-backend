
const { Service } = require('egg');

class LevelService extends Service {


  async createLevels(levelList) {
    const { ctx } = this;
    const levels = await ctx.model.Level.bulkCreate(levelList);
    if (!levels.length) {
      return false;
    }
    return true;
  }


}

module.exports = LevelService;
