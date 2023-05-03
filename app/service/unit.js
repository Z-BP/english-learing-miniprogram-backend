
const { Service } = require('egg');

class UnitService extends Service {


  async createUnits(unitList) {
    const { ctx } = this;
    const units = await ctx.model.Unit.bulkCreate(unitList);
    if (!units.length) {
      return false;
    }
    return true;
  }


}

module.exports = UnitService;
