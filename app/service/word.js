
const { Service } = require('egg');

class WordService extends Service {

  async getWordsByUnitId(unitId) {
    const { ctx } = this;
    const words = await ctx.model.Word.findAll({
      where: {
        unitId,
      },
    });
    return words;
  }

  async getWordsByLevelId(levelId) {
    const { ctx } = this;
    const words = await ctx.model.Word.findAll({
      where: {
        levelId,
      },
    });
    return words;
  }

  async createWords(wordList) {
    const { ctx } = this;
    const words = await ctx.model.Word.bulkCreate(wordList);
    if (!words.length) {
      return false;
    }
    return true;
  }


}

module.exports = WordService;
