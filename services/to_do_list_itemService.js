// Serviço de negócios para itens da lista de tarefas (to_do_list_item)
// Faz a ponte entre o controller e o model, podendo aplicar regras de negócio

const toDoListItemModel = require('../models/to_do_list_itemModel'); // Importa o model de itens de tarefas

const toDoListItemService = {
  // Busca todos os itens cadastrados
  async getAllItems() {
    return await toDoListItemModel.getAllItems();
  },

  // Busca um item específico pelo ID
  async getItemById(id) {
    return await toDoListItemModel.getItemById(id);
  },

  // Cria um novo item de tarefa
  async createItem(data) {
    return await toDoListItemModel.createItem(data);
  },

  // Busca todos os itens de tarefa de um usuário específico
  async getItemsByUserId(user_id) {
    return await toDoListItemModel.getItemsByUserId(user_id);
  }
};

// Exporta o service para ser usado nos controllers
module.exports = toDoListItemService;
