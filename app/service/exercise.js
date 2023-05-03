
const { Service } = require('egg');

class ExerciseService extends Service {


  // 添加或更新多条数据
  async createOrUpdateItems(data) {
    const { ctx } = this;

    const promiseArr = [];

    data.forEach(item => {
      const p = ctx.model.ExerciseWords.findOrCreate({
        where: { userId: item.userId, wordId: item.wordId },
        defaults: {
          enToCn: item.enToCn,
          cnToEn: item.cnToEn,
          spelling: item.spelling,
        },
      });

      promiseArr.push(p);

    });

    const results = await Promise.allSettled(promiseArr);
    const failArr = [];
    results.forEach(result => {
      console.log('result', result);
      if (result.status === 'fulfilled') {
        const [ exercise, created ] = result.value;
        if (!created) {
          // 已存在，则更新
          const item = data.find(_item => {
            return _item.wordId === exercise.wordId;
          });
          console.log('item', item);
          exercise.update({
            enToCn: item.enToCn,
            cnToEn: item.cnToEn,
            spelling: item.spelling,
          });
        }
      } else {
        failArr.push(result.reason);
      }
    });
    return {
      status: !!failArr.length,
      data: failArr,
    };


  }


}

module.exports = ExerciseService;
