const express = require('express');
const router = express.Router();
const earningsController = require('../controllers/earningsController');
const { requireLogin } = require('../middleware/authMiddleware');

// Rota para buscar todos os ganhos
router.get('/', earningsController.getAllEarnings);
// Rota para buscar ganhos do usuário logado
router.get('/me', requireLogin, earningsController.getEarningsByLoggedUser);
// Rota para buscar um ganho pelo ID
router.get('/:id', earningsController.getEarningById);
// Rota para criar um novo ganho
router.post('/', requireLogin, earningsController.createEarning);
// Rota para buscar todos os ganhos de um usuário específico
router.get('/user/:user_id', earningsController.getEarningsByUserId);
// Rotas protegidas para update e delete de ganhos do usuário logado
router.put('/:id', requireLogin, earningsController.updateEarning);
router.delete('/:id', requireLogin, earningsController.deleteEarning);

module.exports = router;
