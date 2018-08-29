'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async noSchema() {
    this.ctx.body = 'success';
  }

  async query() {
    const { name, age } = this.ctx.query;
    return { code: 200, data: { name, age } };
  }

  async params() {
    const { name, age } = this.ctx.params;
    return { code: 200, data: { name, age } };
  }

  async post() {
    const { name, age } = this.ctx.request.body;
    return { code: 200, data: { name, age } };
  }

  async response() {
    const { name, age } = this.ctx.request.body;
    return { code: 200, data: { name, age } };
  }

  async inputError() {
    return { code: 200 };
  }

  async responseUnformat() {
    const { name, age } = this.ctx.request.body;
    return { code: 200, name, age };
  }

  async wrongConvert() {
    return 'success';
  }

  async wrongNumber() {
    const { value } = this.ctx.query;
    return { value };
  }

  async noConvert() {
    const { value } = this.ctx.query;
    return { code: 200, data: { value } };
  }

  async noReturn() {
    console.log('noReturn');
    // forget return value
  }
}

module.exports = TestController;
