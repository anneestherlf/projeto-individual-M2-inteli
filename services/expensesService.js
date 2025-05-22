// Serviço de negócios para despesas financeiras (expenses)
// Faz a ponte entre o controller e o model, podendo aplicar regras de negócio

const expensesModel = require('../models/expensesModel'); // Importa o model de despesas

const expensesService = {
  // Busca todas as despesas cadastradas
  async getAllExpenses() {
    return await expensesModel.getAllExpenses();
  },

  // Busca uma despesa específica pelo ID
  async getExpenseById(id) {
    return await expensesModel.getExpenseById(id);
  },

  // Cria uma nova despesa
  async createExpense(data) {
    return await expensesModel.createExpense(data);
  },

  // Busca todas as despesas de um usuário específico
  async getExpensesByUserId(user_id) {
    return await expensesModel.getExpensesByUserId(user_id);
  }
};

// Exporta o service para ser usado nos controllers
module.exports = expensesService;
