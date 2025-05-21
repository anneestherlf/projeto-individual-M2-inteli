// Importa a configuração do banco de dados
const db = require('../config/db');

// Define o objeto userModel com métodos para manipular os dados dos usuários
const userModel = {
  // Busca todos os usuários cadastrados na tabela "User"
  async getAllUsers() {
    const result = await db.query('SELECT * FROM "User"');
    return result.rows;
  },

  // Busca um usuário específico pelo seu ID primário
  async getUserById(user_id_PK) {
    const result = await db.query('SELECT * FROM "User" WHERE user_id_PK = $1', [user_id_PK]);
    return result.rows[0];
  },

  // Cria um novo usuário na tabela "User"
  async createUser({ user_name, user_email, user_password }) {
    const result = await db.query(
      'INSERT INTO "User" (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [user_name, user_email, user_password]
    );
    return result.rows[0];
  }
};

// Exporta o userModel para ser utilizado em outras partes da aplicação
module.exports = userModel;