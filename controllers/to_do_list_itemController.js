const toDoListItemService = require('../services/to_do_list_itemService');

const getAllItems = async (req, res) => {
  try {
    const items = await toDoListItemService.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await toDoListItemService.getItemById(Number(req.params.id));
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { to_do_list_item_description, to_do_list_item_is_completed = false, user_id_FK } = req.body;
    if (
      !to_do_list_item_description ||
      typeof to_do_list_item_is_completed !== 'boolean' ||
      !user_id_FK
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    const newItem = await toDoListItemService.createItem({
      to_do_list_item_description,
      to_do_list_item_is_completed,
      user_id_FK: Number(user_id_FK)
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemsByUserId = async (req, res) => {
  try {
    const items = await toDoListItemService.getItemsByUserId(Number(req.params.user_id));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  getItemsByUserId
};