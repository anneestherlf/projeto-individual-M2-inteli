// Importa a configuração do banco de dados
const db = require('../config/db');

// Define o objeto goalsModel com métodos para manipular os dados de metas (goals)
const goalsModel = {
  // Busca todas as metas cadastradas na tabela goals
  async getAllGoals() {
    const result = await db.query('SELECT * FROM goals');
    return result.rows;
  },

  // Busca uma meta específica pelo seu ID primário
  async getGoalById(goal_id_PK) {
    // Valida se o ID fornecido é um número inteiro
    if (!Number.isInteger(goal_id_PK)) {
      throw new Error('Invalid goal_id_PK');
    }
    const result = await db.query('SELECT * FROM goals WHERE goal_id_PK = $1', [goal_id_PK]);
    return result.rows[0];
  },

  // Cria um novo registro de meta na tabela goals
  async createGoal({ goal_title, goal_total_value, goal_accumulated_value = 0, goal_is_completed = false, user_id_FK }) {
    // Valida os tipos dos dados recebidos
    if (
      typeof goal_title !== 'string' ||
      typeof goal_total_value !== 'number' ||
      typeof goal_accumulated_value !== 'number' ||
      typeof goal_is_completed !== 'boolean' ||
      !Number.isInteger(user_id_FK)
    ) {
      throw new Error('Invalid input data');
    }
    // Insere a nova meta no banco de dados e retorna o registro criado
    const result = await db.query(
      `INSERT INTO goals 
        (goal_title, goal_total_value, goal_accumulated_value, goal_is_completed, user_id_FK)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [goal_title, goal_total_value, goal_accumulated_value, goal_is_completed, user_id_FK]
    );
    return result.rows[0];
  },

  // Busca todas as metas de um usuário específico pelo seu ID
  async getGoalsByUserId(user_id_FK) {
    // Valida se o ID do usuário é um número inteiro
    if (!Number.isInteger(user_id_FK)) {
      throw new Error('Invalid user_id_FK');
    }
    const result = await db.query('SELECT * FROM goals WHERE user_id_FK = $1', [user_id_FK]);
    return result.rows;
  }
};

// Exporta o goalsModel para ser utilizado em outras partes da aplicação
module.exports = goalsModel;