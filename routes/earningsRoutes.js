const express = require('express');
const router = express.Router();
const earningsController = require('../controllers/earningsController');

// Rota para buscar todos os ganhos
router.get('/', earningsController.getAllEarnings);
// Rota para buscar um ganho pelo ID
router.get('/:id', earningsController.getEarningById);
// Rota para criar um novo ganho
router.post('/', earningsController.createEarning);
// Rota para buscar todos os ganhos de um usuário específico
router.get('/user/:user_id', earningsController.getEarningsByUserId);

module.exports = router;
