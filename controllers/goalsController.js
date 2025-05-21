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
    // Extrai os dados do corpo da requisição
    const { goal_title, goal_total_value, goal_accumulated_value = 0, goal_is_completed = false, user_id_FK } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos e são válidos
    if (
      !goal_title ||
      typeof goal_total_value !== 'number' ||
      typeof goal_accumulated_value !== 'number' ||
      typeof goal_is_completed !== 'boolean' ||
      !user_id_FK
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    // Cria a nova meta usando o serviço
    const newGoal = await goalsService.createGoal({
      goal_title,
      goal_total_value,
      goal_accumulated_value,
      goal_is_completed,
      user_id_FK: Number(user_id_FK)
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

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllGoals,
  getGoalById,
  createGoal,
  getGoalsByUserId
};