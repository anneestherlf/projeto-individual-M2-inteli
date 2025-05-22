// Importa o serviço responsável pela lógica dos ganhos (earnings)
const earningsService = require('../services/earningsService');

// Controlador para buscar todos os ganhos
const getAllEarnings = async (req, res) => {
  try {
    const earnings = await earningsService.getAllEarnings();
    res.status(200).json(earnings); // Retorna todos os ganhos em formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar um ganho pelo ID
const getEarningById = async (req, res) => {
  try {
    // Busca o ganho pelo ID passado na URL
    const earning = await earningsService.getEarningById(Number(req.params.id));
    if (earning) {
      res.status(200).json(earning); // Ganho encontrado
    } else {
      res.status(404).json({ error: 'Ganho não encontrado' }); // Ganho não existe
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para criar um novo ganho
const createEarning = async (req, res) => {
  try {
    // Sempre usa o userId da sessão, ignorando user_id_FK do body
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const { value_earning, description_earning, date_earning, category_earning } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos e são válidos
    if (
      typeof value_earning !== 'number' ||
      typeof description_earning !== 'string' ||
      !date_earning ||
      typeof category_earning !== 'string'
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    // Cria o novo ganho usando o serviço
    const newEarning = await earningsService.createEarning({
      value_earning,
      description_earning,
      date_earning,
      category_earning,
      user_id_FK: Number(userId)
    });
    res.status(201).json(newEarning); // Retorna o ganho criado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar todos os ganhos de um usuário específico
const getEarningsByUserId = async (req, res) => {
  try {
    const earnings = await earningsService.getEarningsByUserId(Number(req.params.user_id));
    res.status(200).json(earnings); // Retorna os ganhos do usuário
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar todos os ganhos do usuário logado
const getEarningsByLoggedUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const earnings = await earningsService.getEarningsByUserId(Number(userId));
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para atualizar um ganho do usuário logado
const updateEarning = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const earningId = Number(req.params.id);
    // Busca o ganho e verifica se pertence ao usuário logado
    const earning = await earningsService.getEarningById(earningId);
    if (!earning || earning.user_id_FK !== userId) {
      return res.status(404).json({ error: 'Ganho não encontrado ou acesso negado' });
    }
    // Extrai os dados do corpo da requisição
    const { value_earning, description_earning, date_earning, category_earning } = req.body;
    // Atualiza o ganho
    const updated = await earningsService.updateEarning({
      earning_id_PK: earningId,
      value_earning,
      description_earning,
      date_earning,
      category_earning,
      user_id_FK: userId
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para deletar um ganho do usuário logado
const deleteEarning = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const earningId = Number(req.params.id);
    // Busca o ganho e verifica se pertence ao usuário logado
    const earning = await earningsService.getEarningById(earningId);
    if (!earning || earning.user_id_FK !== userId) {
      return res.status(404).json({ error: 'Ganho não encontrado ou acesso negado' });
    }
    // Deleta o ganho
    await earningsService.deleteEarning(earningId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllEarnings, // Apenas para debug/admin, não use no frontend
  getEarningById, // Apenas para debug/admin, não use no frontend
  createEarning: async (req, res) => {
    try {
      // Sempre usa o userId da sessão, ignorando user_id_FK do body
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ error: 'Não autenticado' });
      const { value_earning, description_earning, date_earning, category_earning } = req.body;
      if (
        typeof value_earning !== 'number' ||
        typeof description_earning !== 'string' ||
        !date_earning ||
        typeof category_earning !== 'string'
      ) {
        return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
      }
      const newEarning = await earningsService.createEarning({
        value_earning,
        description_earning,
        date_earning,
        category_earning,
        user_id_FK: Number(userId)
      });
      res.status(201).json(newEarning);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getEarningsByUserId, // Apenas para debug/admin, não use no frontend
  getEarningsByLoggedUser, // Use esta rota para listar ganhos do usuário logado
  updateEarning, // Atualiza ganho do usuário logado
  deleteEarning // Deleta ganho do usuário logado
};