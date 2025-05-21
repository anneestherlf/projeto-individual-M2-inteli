// services/goalsService.js

const goalsModel = require('../models/goalsModel');

const goalsService = {
  async getAllGoals() {
    return await goalsModel.getAllGoals();
  },

  async getGoalById(id) {
    return await goalsModel.getGoalById(id);
  },

  async createGoal(data) {
    return await goalsModel.createGoal(data);
  },

  async getGoalsByUserId(user_id) {
    return await goalsModel.getGoalsByUserId(user_id);
  }
};

module.exports = goalsService;
