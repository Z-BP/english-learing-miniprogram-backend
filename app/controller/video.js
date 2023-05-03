const { Controller } = require('egg');
const vVideo = {
  title: 'string',
  cover: 'string?',
  src: 'string',
  levelId: 'int',
};

const vVideoList = {
  data: {
    type: 'array',
    itemType: 'object',
    rule: vVideo,
  },
};

class VideoController extends Controller {

  // 返回用户对应等级的视频数据
  async list() {
    const { ctx } = this;
    // 获取用户信息
    const user = await ctx.service.user.getUserInfo();
    // 业务处理
    const data = await ctx.model.Video.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ],
      },
      where: {
        levelId: user.levelId,
      },
    });
    if (!data[0]) {
      ctx.body = {
        status: false,
        mas: 'fail',
        data,
      };
    }
    ctx.body = {
      status: true,
      mas: 'ok',
      data,
    };
  }


  // 添加视频数据
  async create() {
    const { ctx } = this;
    // validate
    console.log('ddddddd', ctx.request.body);
    ctx.validate(vVideoList, { data: ctx.request.body });

    const res = await ctx.service.video.createVideos(ctx.request.body);
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

module.exports = VideoController;
