const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goalsController');

// Rota para buscar todas as metas
router.get('/', goalsController.getAllGoals);
// Rota para buscar uma meta pelo ID
router.get('/:id', goalsController.getGoalById);
// Rota para criar uma nova meta
router.post('/', goalsController.createGoal);
// Rota para buscar todas as metas de um usuário específico
router.get('/user/:user_id', goalsController.getGoalsByUserId);

module.exports = router;
