const goalsService = require('../services/goalsService');

const getAllGoals = async (req, res) => {
  try {
    const goals = await goalsService.getAllGoals();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGoalById = async (req, res) => {
  try {
    const goal = await goalsService.getGoalById(Number(req.params.id));
    if (goal) {
      res.status(200).json(goal);
    } else {
      res.status(404).json({ error: 'Meta não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGoal = async (req, res) => {
  try {
    const { goal_title, goal_total_value, goal_accumulated_value = 0, goal_is_completed = false, user_id_FK } = req.body;
    if (
      !goal_title ||
      typeof goal_total_value !== 'number' ||
      typeof goal_accumulated_value !== 'number' ||
      typeof goal_is_completed !== 'boolean' ||
      !user_id_FK
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    const newGoal = await goalsService.createGoal({
      goal_title,
      goal_total_value,
      goal_accumulated_value,
      goal_is_completed,
      user_id_FK: Number(user_id_FK)
    });
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGoalsByUserId = async (req, res) => {
  try {
    const goals = await goalsService.getGoalsByUserId(Number(req.params.user_id));
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllGoals,
  getGoalById,
  createGoal,
  getGoalsByUserId
};