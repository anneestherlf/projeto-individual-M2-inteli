const db = require('../config/db');

const goalsModel = {
  async getAllGoals() {
    const result = await db.query('SELECT * FROM goals');
    return result.rows;
  },

  async getGoalById(goal_id_PK) {
    if (!Number.isInteger(goal_id_PK)) {
      throw new Error('Invalid goal_id_PK');
    }
    const result = await db.query('SELECT * FROM goals WHERE goal_id_PK = $1', [goal_id_PK]);
    return result.rows[0];
  },

  async createGoal({ goal_title, goal_total_value, goal_accumulated_value = 0, goal_is_completed = false, user_id_FK }) {
    if (
      typeof goal_title !== 'string' ||
      typeof goal_total_value !== 'number' ||
      typeof goal_accumulated_value !== 'number' ||
      typeof goal_is_completed !== 'boolean' ||
      !Number.isInteger(user_id_FK)
    ) {
      throw new Error('Invalid input data');
    }
    const result = await db.query(
      `INSERT INTO goals 
        (goal_title, goal_total_value, goal_accumulated_value, goal_is_completed, user_id_FK)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [goal_title, goal_total_value, goal_accumulated_value, goal_is_completed, user_id_FK]
    );
    return result.rows[0];
  },

  async getGoalsByUserId(user_id_FK) {
    if (!Number.isInteger(user_id_FK)) {
      throw new Error('Invalid user_id_FK');
    }
    const result = await db.query('SELECT * FROM goals WHERE user_id_FK = $1', [user_id_FK]);
    return result.rows;
  }
};

module.exports = goalsModel;