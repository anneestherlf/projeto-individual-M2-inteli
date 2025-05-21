const db = require('../config/db');

const earningsModel = {
  async getAllEarnings() {
    const result = await db.query('SELECT * FROM earnings');
    return result.rows;
  },

  async getEarningById(earning_id_PK) {
    if (!Number.isInteger(earning_id_PK)) {
      throw new Error('Invalid earning_id_PK');
    }
    const result = await db.query('SELECT * FROM earnings WHERE earning_id_PK = $1', [earning_id_PK]);
    return result.rows[0];
  },

  async createEarning({ value_earning, description_earning, date_earning, category_earning, user_id_FK }) {
    if (
      typeof value_earning !== 'number' ||
      typeof description_earning !== 'string' ||
      isNaN(Date.parse(date_earning)) ||
      typeof category_earning !== 'string' ||
      !Number.isInteger(user_id_FK)
    ) {
      throw new Error('Invalid input data');
    }
    const result = await db.query(
      `INSERT INTO earnings 
        (value_earning, description_earning, date_earning, category_earning, user_id_FK)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [value_earning, description_earning, date_earning, category_earning, user_id_FK]
    );
    return result.rows[0];
  },

  async getEarningsByUserId(user_id_FK) {
    if (!Number.isInteger(user_id_FK)) {
      throw new Error('Invalid user_id_FK');
    }
    const result = await db.query('SELECT * FROM earnings WHERE user_id_FK = $1', [user_id_FK]);
    return result.rows;
  }
};

module.exports = earningsModel;