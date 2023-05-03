'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
    const game = await this.ctx.model.Game.create({
      name: '游戏ff',
    });
    console.log('game', game);
  }
}

module.exports = HomeController;
