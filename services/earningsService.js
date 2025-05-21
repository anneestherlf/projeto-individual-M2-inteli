// services/earningsService.js

const earningsModel = require('../models/earningsModel');

const earningsService = {
  async getAllEarnings() {
    return await earningsModel.getAllEarnings();
  },

  async getEarningById(id) {
    return await earningsModel.getEarningById(id);
  },

  async createEarning(data) {
    return await earningsModel.createEarning(data);
  },

  async getEarningsByUserId(user_id) {
    return await earningsModel.getEarningsByUserId(user_id);
  }
};

module.exports = earningsService;
