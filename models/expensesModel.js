// Importa a configuração do banco de dados
const db = require('../config/db');

// Define o objeto expensesModel com métodos para manipular os dados de despesas (expenses)
const expensesModel = {
  // Busca todas as despesas cadastradas na tabela expenses
  async getAllExpenses() {
    const result = await db.query('SELECT * FROM expenses');
    return result.rows;
  },

  // Busca uma despesa específica pelo seu ID primário
  async getExpenseById(expense_id_PK) {
    const result = await db.query('SELECT * FROM expenses WHERE expense_id_PK = $1', [expense_id_PK]);
    return result.rows[0];
  },

  // Cria um novo registro de despesa na tabela expenses
  async createExpense({ value_expense, description_expense, date_expense, category_expense, user_id_FK }) {
    const result = await db.query(
      `INSERT INTO expenses 
        (value_expense, description_expense, date_expense, category_expense, user_id_FK)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [value_expense, description_expense, date_expense, category_expense, user_id_FK]
    );
    return result.rows[0];
  },

  // Busca todas as despesas de um usuário específico pelo seu ID
  async getExpensesByUserId(user_id_FK) {
    const result = await db.query('SELECT * FROM expenses WHERE user_id_FK = $1', [user_id_FK]);
    return result.rows;
  }
};

// Exporta o expensesModel para ser utilizado em outras partes da aplicação
module.exports = expensesModel;