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
    // Sempre usa o userId da sessão, ignorando user_id_FK do body
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const { to_do_list_item_description, to_do_list_item_is_completed = false } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos e são válidos
    if (
      !to_do_list_item_description ||
      typeof to_do_list_item_is_completed !== 'boolean'
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    // Cria o novo item usando o serviço
    const newItem = await toDoListItemService.createItem({
      to_do_list_item_description,
      to_do_list_item_is_completed,
      user_id_FK: Number(userId)
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

// Controlador para buscar todos os itens do usuário logado
const getItemsByLoggedUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const items = await toDoListItemService.getItemsByUserId(Number(userId));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para atualizar um item da lista do usuário logado
const updateItem = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const itemId = Number(req.params.id);
    // Busca o item e verifica se pertence ao usuário logado
    const item = await toDoListItemService.getItemById(itemId);
    if (!item || item.user_id_FK !== userId) {
      return res.status(404).json({ error: 'Item não encontrado ou acesso negado' });
    }
    // Extrai os dados do corpo da requisição
    const { to_do_list_item_description, to_do_list_item_is_completed } = req.body;
    // Atualiza o item
    const updated = await toDoListItemService.updateItem({
      to_do_list_item_id_PK: itemId,
      to_do_list_item_description,
      to_do_list_item_is_completed,
      user_id_FK: userId
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para deletar um item da lista do usuário logado
const deleteItem = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const itemId = Number(req.params.id);
    // Busca o item e verifica se pertence ao usuário logado
    const item = await toDoListItemService.getItemById(itemId);
    if (!item || item.user_id_FK !== userId) {
      return res.status(404).json({ error: 'Item não encontrado ou acesso negado' });
    }
    // Deleta o item
    await toDoListItemService.deleteItem(itemId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllItems, // Apenas para debug/admin, não use no frontend
  getItemById, // Apenas para debug/admin, não use no frontend
  createItem: async (req, res) => {
    try {
      // Sempre usa o userId da sessão, ignorando user_id_FK do body
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ error: 'Não autenticado' });
      const { to_do_list_item_description, to_do_list_item_is_completed = false } = req.body;
      // Valida se todos os campos obrigatórios foram fornecidos e são válidos
      if (
        !to_do_list_item_description ||
        typeof to_do_list_item_is_completed !== 'boolean'
      ) {
        return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
      }
      // Cria o novo item usando o serviço
      const newItem = await toDoListItemService.createItem({
        to_do_list_item_description,
        to_do_list_item_is_completed,
        user_id_FK: Number(userId)
      });
      res.status(201).json(newItem); // Retorna o item criado
    } catch (error) {
      res.status(500).json({ error: error.message }); // Erro interno do servidor
    }
  },
  getItemsByUserId, // Apenas para debug/admin, não use no frontend
  getItemsByLoggedUser, // Use esta rota para listar itens do usuário logado
  updateItem, // Atualiza item do usuário logado
  deleteItem // Deleta item do usuário logado
};