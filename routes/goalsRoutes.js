const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goalsController');
const { requireLogin } = require('../middleware/authMiddleware');

// Rota para buscar todas as metas (API, use /api/goals)
router.get('/', goalsController.getAllGoals);
// Rota para buscar metas do usuário logado (deve vir antes de /:id)
router.get('/me', requireLogin, goalsController.getGoalsByLoggedUser);
// Rota para criar uma nova meta
router.post('/', requireLogin, goalsController.createGoal);
// Rota para buscar todas as metas de um usuário específico
router.get('/user/:user_id', goalsController.getGoalsByUserId);
// Rota para buscar uma meta pelo ID
router.get('/:id', goalsController.getGoalById);
// Rotas protegidas para update e delete de metas do usuário logado
router.put('/:id', requireLogin, goalsController.updateGoal);
router.delete('/:id', requireLogin, goalsController.deleteGoal);

module.exports = router;
