
const { Service } = require('egg');

class VideoService extends Service {


  async createVideos(videoList) {
    const { ctx } = this;
    const videos = await ctx.model.Video.bulkCreate(videoList);
    if (!videos.length) {
      return false;
    }
    return true;
  }


}

module.exports = VideoService;
