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
  async createUser(name, email, password = 'senha_padrao') {
    return await userModel.create({ name, email, password });
  },

  // Atualiza um usuário existente (nome, email e senha)
  async updateUser(id, name, email, password) {
    // Atualiza nome e email
    let result = await userModel.update(id, { name, email });
    // Atualiza senha se fornecida
    if (password && password.trim() !== '') {
      await userModel.updatePassword(id, password);
      // Atualiza o objeto retornado para refletir a nova senha
      result = { ...result, user_password: password };
    }
    return result;
  },

  // Deleta um usuário pelo ID
  async deleteUser(id) {
    return await userModel.delete(id);
  }
};

// Exporta o service para ser usado nos controllers
module.exports = userService;
