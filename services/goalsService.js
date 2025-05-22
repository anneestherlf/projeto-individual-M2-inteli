// Serviço de negócios para metas financeiras (goals)
// Faz a ponte entre o controller e o model, podendo aplicar regras de negócio

const goalsModel = require('../models/goalsModel'); // Importa o model de metas

const goalsService = {
  // Busca todas as metas cadastradas
  async getAllGoals() {
    return await goalsModel.getAllGoals();
  },

  // Busca uma meta específica pelo ID
  async getGoalById(id) {
    return await goalsModel.getGoalById(id);
  },

  // Cria uma nova meta
  async createGoal(data) {
    return await goalsModel.createGoal(data);
  },

  // Busca todas as metas de um usuário específico
  async getGoalsByUserId(user_id) {
    return await goalsModel.getGoalsByUserId(user_id);
  }
};

// Exporta o service para ser usado nos controllers
module.exports = goalsService;
