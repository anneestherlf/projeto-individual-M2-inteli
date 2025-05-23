// Serviço de negócios para ganhos financeiros (earnings)
// Faz a ponte entre o controller e o model, podendo aplicar regras de negócio

const earningsModel = require('../models/earningsModel'); // Importa o model de ganhos

const earningsService = {
  // Busca todos os ganhos cadastrados
  async getAllEarnings() {
    return await earningsModel.getAllEarnings();
  },

  // Busca um ganho específico pelo ID
  async getEarningById(id) {
    return await earningsModel.getEarningById(id);
  },

  // Cria um novo ganho
  async createEarning(data) {
    return await earningsModel.createEarning(data);
  },

  // Busca todos os ganhos de um usuário específico
  async getEarningsByUserId(user_id) {
    return await earningsModel.getEarningsByUserId(user_id);
  },

  // Atualiza um ganho do usuário
  async updateEarning(data) {
    return await earningsModel.updateEarning(data);
  },
  // Deleta um ganho do usuário
  async deleteEarning(earning_id_PK, user_id_FK) {
    return await earningsModel.deleteEarning(earning_id_PK, user_id_FK);
  }
};

// Exporta o service para ser usado nos controllers
module.exports = earningsService;
