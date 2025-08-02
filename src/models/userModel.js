// Importa a configuração do banco de dados
const db = require('../config/db');

// Define o objeto userModel com métodos para manipular os dados dos usuários
const userModel = {
  // Busca todos os usuários cadastrados na tabela "User"
  async getAllUsers() {
    const result = await db.query('SELECT user_id_PK as id, user_name as name, user_email as email, user_password as password FROM "User"');
    return result.rows;
  },

  // Busca um usuário específico pelo seu ID primário
  async getUserById(user_id_PK) {
    const result = await db.query('SELECT * FROM "User" WHERE user_id_PK = $1', [user_id_PK]);
    if (!result || !result.rows || result.rows.length === 0) return undefined;
    return result.rows[0];
  },

  // Cria um novo usuário na tabela "User"
  async createUser({ user_name, user_email, user_password }) {
    const result = await db.query(
      'INSERT INTO "User" (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [user_name, user_email, user_password]
    );
    return result.rows[0];
  },

  // Métodos compatíveis com os testes automatizados
  async getAll() {
    return await this.getAllUsers();
  },

  async getById(id) {
    return await this.getUserById(id);
  },

  async create({ name, email, password = 'senha_padrao' }) {
    // Adapta para o formato esperado pelo banco
    return await this.createUser({ user_name: name, user_email: email, user_password: password });
  },

  async update(id, { name, email }) {
    // Atualiza apenas nome e email
    const result = await db.query(
      'UPDATE "User" SET user_name = $1, user_email = $2 WHERE user_id_PK = $3 RETURNING *',
      [name, email, id]
    );
    return result.rows[0];
  },

  // Atualiza apenas a senha do usuário
  async updatePassword(id, password) {
    const result = await db.query(
      'UPDATE "User" SET user_password = $1 WHERE user_id_PK = $2 RETURNING *',
      [password, id]
    );
    return result.rows[0];
  },

  async deleteUser(id) {
    // Busca o usuário antes de deletar
    const user = await this.getUserById(id);
    if (!user) return false;
    await db.query('DELETE FROM "User" WHERE user_id_PK = $1', [id]);
    return true;
  }
};

// Exporta o userModel para ser utilizado em outras partes da aplicação
module.exports = {
  ...userModel,
  delete: userModel.deleteUser
};