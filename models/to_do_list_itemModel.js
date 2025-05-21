// Importa a configuração do banco de dados
const db = require('../config/db');

// Define o objeto toDoListItemModel com métodos para manipular os itens da lista de tarefas (to-do list)
const toDoListItemModel = {
  // Busca todos os itens cadastrados na tabela to_do_list_item
  async getAllItems() {
    const result = await db.query('SELECT * FROM to_do_list_item');
    return result.rows;
  },

  // Busca um item específico pelo seu ID primário
  async getItemById(to_do_list_item_id_PK) {
    // Valida se o ID fornecido é um número inteiro
    if (!Number.isInteger(to_do_list_item_id_PK)) {
      throw new Error('Invalid to_do_list_item_id_PK');
    }
    const result = await db.query(
      'SELECT * FROM to_do_list_item WHERE to_do_list_item_id_PK = $1',
      [to_do_list_item_id_PK]
    );
    return result.rows[0];
  },

  // Cria um novo item na tabela to_do_list_item
  async createItem({ to_do_list_item_description, to_do_list_item_is_completed = false, user_id_FK }) {
    // Valida os tipos dos dados recebidos
    if (
      typeof to_do_list_item_description !== 'string' ||
      typeof to_do_list_item_is_completed !== 'boolean' ||
      !Number.isInteger(user_id_FK)
    ) {
      throw new Error('Invalid input data');
    }
    // Insere o novo item no banco de dados e retorna o registro criado
    const result = await db.query(
      `INSERT INTO to_do_list_item 
        (to_do_list_item_description, to_do_list_item_is_completed, user_id_FK)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [to_do_list_item_description, to_do_list_item_is_completed, user_id_FK]
    );
    return result.rows[0];
  },

  // Busca todos os itens de um usuário específico pelo seu ID
  async getItemsByUserId(user_id_FK) {
    // Valida se o ID do usuário é um número inteiro
    if (!Number.isInteger(user_id_FK)) {
      throw new Error('Invalid user_id_FK');
    }
    const result = await db.query(
      'SELECT * FROM to_do_list_item WHERE user_id_FK = $1',
      [user_id_FK]
    );
    return result.rows;
  }
};

// Exporta o toDoListItemModel para ser utilizado em outras partes da aplicação
module.exports = toDoListItemModel;