'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { name, age } = this.ctx.query;
    return { code: 200, data: { name, age, undefinedKey: 'value' } };
  }
}

module.exports = HomeController;
