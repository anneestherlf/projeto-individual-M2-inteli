// Importa o serviço responsável pela lógica das metas (goals)
const goalsService = require('../services/goalsService');

// Controlador para buscar todas as metas
const getAllGoals = async (req, res) => {
  try {
    const goals = await goalsService.getAllGoals();
    res.status(200).json(goals); // Retorna todas as metas em formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar uma meta pelo ID
const getGoalById = async (req, res) => {
  try {
    // Busca a meta pelo ID passado na URL
    const goal = await goalsService.getGoalById(Number(req.params.id));
    if (goal) {
      res.status(200).json(goal); // Meta encontrada
    } else {
      res.status(404).json({ error: 'Meta não encontrada' }); // Meta não existe
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para criar uma nova meta
const createGoal = async (req, res) => {
  try {
    // Sempre usa o userId da sessão, ignorando user_id_FK do body
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const { goal_title, goal_total_value, goal_accumulated_value = 0, goal_is_completed = false } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos e são válidos
    if (
      !goal_title ||
      typeof goal_total_value !== 'number' ||
      typeof goal_accumulated_value !== 'number' ||
      typeof goal_is_completed !== 'boolean'
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    // Cria a nova meta usando o serviço
    const newGoal = await goalsService.createGoal({
      goal_title,
      goal_total_value,
      goal_accumulated_value,
      goal_is_completed,
      user_id_FK: Number(userId)
    });
    res.status(201).json(newGoal); // Retorna a meta criada
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar todas as metas de um usuário específico
const getGoalsByUserId = async (req, res) => {
  try {
    const goals = await goalsService.getGoalsByUserId(Number(req.params.user_id));
    res.status(200).json(goals); // Retorna as metas do usuário
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar todas as metas de um usuário logado
const getGoalsByLoggedUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const goals = await goalsService.getGoalsByUserId(Number(userId));
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para atualizar uma meta do usuário logado
const updateGoal = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const goalId = Number(req.params.id);
    // Busca a meta e verifica se pertence ao usuário logado
    const goal = await goalsService.getGoalById(goalId);
    if (!goal || goal.user_id_FK !== userId) {
      return res.status(404).json({ error: 'Meta não encontrada ou acesso negado' });
    }
    // Extrai os dados do corpo da requisição
    const { goal_title, goal_total_value, goal_accumulated_value, goal_is_completed } = req.body;
    // Atualiza a meta
    const updated = await goalsService.updateGoal({
      goal_id_PK: goalId,
      goal_title,
      goal_total_value,
      goal_accumulated_value,
      goal_is_completed,
      user_id_FK: userId
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para deletar uma meta do usuário logado
const deleteGoal = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const goalId = Number(req.params.id);
    // Busca a meta e verifica se pertence ao usuário logado
    const goal = await goalsService.getGoalById(goalId);
    if (!goal || goal.user_id_FK !== userId) {
      return res.status(404).json({ error: 'Meta não encontrada ou acesso negado' });
    }
    // Deleta a meta
    await goalsService.deleteGoal(goalId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllGoals, // Apenas para debug/admin, não use no frontend
  getGoalById, // Apenas para debug/admin, não use no frontend
  createGoal: async (req, res) => {
    try {
      // Sempre usa o userId da sessão, ignorando user_id_FK do body
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ error: 'Não autenticado' });
      const { goal_title, goal_total_value, goal_accumulated_value = 0, goal_is_completed = false } = req.body;
      if (
        !goal_title ||
        typeof goal_total_value !== 'number' ||
        typeof goal_accumulated_value !== 'number' ||
        typeof goal_is_completed !== 'boolean'
      ) {
        return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
      }
      const newGoal = await goalsService.createGoal({
        goal_title,
        goal_total_value,
        goal_accumulated_value,
        goal_is_completed,
        user_id_FK: Number(userId)
      });
      res.status(201).json(newGoal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getGoalsByUserId, // Apenas para debug/admin, não use no frontend
  getGoalsByLoggedUser, // Use esta rota para listar metas do usuário logado
  updateGoal, // Atualiza meta do usuário logado
  deleteGoal // Deleta meta do usuário logado
};