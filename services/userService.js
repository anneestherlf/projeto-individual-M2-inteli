// services/userService.js

const db = require('../config/db');

// Serviço de negócios para usuários
// Faz a ponte entre o controller e o model, podendo aplicar regras de negócio

const userModel = require('../models/userModel'); // Importa o model de usuários

const userService = {
  // Busca todos os usuários cadastrados
  async getAllUsers() {
    return await userModel.getAll();
  },

  // Busca um usuário específico pelo ID
  async getUserById(id) {
    return await userModel.getById(id);
  },

  // Cria um novo usuário
  async createUser(name, email) {
    return await userModel.create({ name, email });
  },

  // Atualiza um usuário existente
  async updateUser(id, name, email) {
    return await userModel.update(id, { name, email });
  },

  // Deleta um usuário pelo ID
  async deleteUser(id) {
    return await userModel.delete(id);
  }
};

// Exporta o service para ser usado nos controllers
module.exports = userService;
