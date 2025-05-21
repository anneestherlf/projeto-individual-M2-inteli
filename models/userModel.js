const db = require('../config/db');

const userModel = {
  async getAllUsers() {
    const result = await db.query('SELECT * FROM "User"');
    return result.rows;
  },

  async getUserById(user_id_PK) {
    const result = await db.query('SELECT * FROM "User" WHERE user_id_PK = $1', [user_id_PK]);
    return result.rows[0];
  },

  async createUser({ user_name, user_email, user_password }) {
    const result = await db.query(
      'INSERT INTO "User" (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [user_name, user_email, user_password]
    );
    return result.rows[0];
  }
};

module.exports = userModel;