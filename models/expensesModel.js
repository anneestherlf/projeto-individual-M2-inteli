const db = require('../config/db');

const expensesModel = {
  async getAllExpenses() {
    const result = await db.query('SELECT * FROM expenses');
    return result.rows;
  },

  async getExpenseById(expense_id_PK) {
    const result = await db.query('SELECT * FROM expenses WHERE expense_id_PK = $1', [expense_id_PK]);
    return result.rows[0];
  },

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

  async getExpensesByUserId(user_id_FK) {
    const result = await db.query('SELECT * FROM expenses WHERE user_id_FK = $1', [user_id_FK]);
    return result.rows;
  }
};

module.exports = expensesModel;