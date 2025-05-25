const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');
const { requireLogin } = require('../middleware/authMiddleware');

// Rota para buscar todas as despesas
router.get('/', expensesController.getAllExpenses);
// Rota para buscar despesas do usuário logado (deve vir antes de /:id)
router.get('/me', requireLogin, expensesController.getExpensesByLoggedUser);
// Rota para criar uma nova despesa
router.post('/', requireLogin, expensesController.createExpense);
// Rota para buscar todas as despesas de um usuário específico
router.get('/user/:user_id', expensesController.getExpensesByUserId);
// Rota para buscar uma despesa pelo ID
router.get('/:id', expensesController.getExpenseById);
// Rotas protegidas para update e delete de despesas do usuário logado
router.put('/:id', requireLogin, expensesController.updateExpense);
router.delete('/:id', requireLogin, expensesController.deleteExpense);

module.exports = router;
