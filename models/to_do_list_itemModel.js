const db = require('../config/db');

const toDoListItemModel = {
  async getAllItems() {
    const result = await db.query('SELECT * FROM to_do_list_item');
    return result.rows;
  },

  async getItemById(to_do_list_item_id_PK) {
    if (!Number.isInteger(to_do_list_item_id_PK)) {
      throw new Error('Invalid to_do_list_item_id_PK');
    }
    const result = await db.query(
      'SELECT * FROM to_do_list_item WHERE to_do_list_item_id_PK = $1',
      [to_do_list_item_id_PK]
    );
    return result.rows[0];
  },

  async createItem({ to_do_list_item_description, to_do_list_item_is_completed = false, user_id_FK }) {
    if (
      typeof to_do_list_item_description !== 'string' ||
      typeof to_do_list_item_is_completed !== 'boolean' ||
      !Number.isInteger(user_id_FK)
    ) {
      throw new Error('Invalid input data');
    }
    const result = await db.query(
      `INSERT INTO to_do_list_item 
        (to_do_list_item_description, to_do_list_item_is_completed, user_id_FK)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [to_do_list_item_description, to_do_list_item_is_completed, user_id_FK]
    );
    return result.rows[0];
  },

  async getItemsByUserId(user_id_FK) {
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

module.exports = toDoListItemModel;