// Importa a configuração do banco de dados
const db = require('../config/db');

// Define o objeto earningsModel com métodos para manipular os dados de ganhos (earnings)
const earningsModel = {
  // Busca todos os registros da tabela earnings
  async getAllEarnings() {
    const result = await db.query('SELECT * FROM earnings');
    return result.rows;
  },

  // Busca um ganho específico pelo seu ID primário
  async getEarningById(earning_id_PK) {
    // Valida se o ID fornecido é um número inteiro
    if (!Number.isInteger(earning_id_PK)) {
      throw new Error('Invalid earning_id_PK');
    }
    const result = await db.query('SELECT * FROM earnings WHERE earning_id_PK = $1', [earning_id_PK]);
    return result.rows[0];
  },

  // Cria um novo registro de ganho na tabela earnings
  async createEarning({ value_earning, description_earning, date_earning, category_earning, user_id_FK }) {
    // Valida os tipos dos dados recebidos
    if (
      typeof value_earning !== 'number' ||
      typeof description_earning !== 'string' ||
      isNaN(Date.parse(date_earning)) ||
      typeof category_earning !== 'string' ||
      !Number.isInteger(user_id_FK)
    ) {
      throw new Error('Invalid input data');
    }
    // Insere o novo ganho no banco de dados e retorna o registro criado
    const result = await db.query(
      `INSERT INTO earnings 
        (value_earning, description_earning, date_earning, category_earning, user_id_FK)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [value_earning, description_earning, date_earning, category_earning, user_id_FK]
    );
    return result.rows[0];
  },

  // Busca todos os ganhos de um usuário específico pelo seu ID
  async getEarningsByUserId(user_id_FK) {
    // Valida se o ID do usuário é um número inteiro
    if (!Number.isInteger(user_id_FK)) {
      throw new Error('Invalid user_id_FK');
    }
    const result = await db.query('SELECT * FROM earnings WHERE user_id_FK = $1', [user_id_FK]);
    return result.rows;
  }
};

// Exporta o earningsModel para ser utilizado em outras partes da aplicação
module.exports = earningsModel;