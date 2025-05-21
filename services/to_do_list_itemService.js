// services/to_do_list_itemService.js

const toDoListItemModel = require('../models/to_do_list_itemModel');

// Função para obter todos os itens da lista de tarefas
toDoListItemService = {
  async getAllItems() {
    return await toDoListItemModel.getAllItems();
  },

  // Função para obter um item por ID
  async getItemById(id) {
    return await toDoListItemModel.getItemById(id);
  },

  // Função para criar um novo item
  async createItem(data) {
    return await toDoListItemModel.createItem(data);
  },

  // Função para obter todos os itens de um usuário específico
  async getItemsByUserId(user_id) {
    return await toDoListItemModel.getItemsByUserId(user_id);
  }
};

module.exports = toDoListItemService;
