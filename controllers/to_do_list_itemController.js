// Importa o serviço responsável pela lógica dos itens da lista de tarefas
const toDoListItemService = require('../services/to_do_list_itemService');

// Controlador para buscar todos os itens da lista de tarefas
const getAllItems = async (req, res) => {
  try {
    const items = await toDoListItemService.getAllItems();
    res.status(200).json(items); // Retorna todos os itens em formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar um item pelo ID
const getItemById = async (req, res) => {
  try {
    // Busca o item pelo ID passado na URL
    const item = await toDoListItemService.getItemById(Number(req.params.id));
    if (item) {
      res.status(200).json(item); // Item encontrado
    } else {
      res.status(404).json({ error: 'Item não encontrado' }); // Item não existe
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para criar um novo item na lista de tarefas
const createItem = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { to_do_list_item_description, to_do_list_item_is_completed = false, user_id_FK } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos e são válidos
    if (
      !to_do_list_item_description ||
      typeof to_do_list_item_is_completed !== 'boolean' ||
      !user_id_FK
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    // Cria o novo item usando o serviço
    const newItem = await toDoListItemService.createItem({
      to_do_list_item_description,
      to_do_list_item_is_completed,
      user_id_FK: Number(user_id_FK)
    });
    res.status(201).json(newItem); // Retorna o item criado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar todos os itens de um usuário específico
const getItemsByUserId = async (req, res) => {
  try {
    const items = await toDoListItemService.getItemsByUserId(Number(req.params.user_id));
    res.status(200).json(items); // Retorna os itens do usuário
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllItems,
  getItemById,
  createItem,
  getItemsByUserId
};