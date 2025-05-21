// services/expensesService.js

const expensesModel = require('../models/expensesModel');

const expensesService = {
  async getAllExpenses() {
    return await expensesModel.getAllExpenses();
  },

  async getExpenseById(id) {
    return await expensesModel.getExpenseById(id);
  },

  async createExpense(data) {
    return await expensesModel.createExpense(data);
  },

  async getExpensesByUserId(user_id) {
    return await expensesModel.getExpensesByUserId(user_id);
  }
};

module.exports = expensesService;
