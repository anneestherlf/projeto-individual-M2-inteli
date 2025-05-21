const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

// Rota para buscar todas as despesas
router.get('/', expensesController.getAllExpenses);
// Rota para buscar uma despesa pelo ID
router.get('/:id', expensesController.getExpenseById);
// Rota para criar uma nova despesa
router.post('/', expensesController.createExpense);
// Rota para buscar todas as despesas de um usuário específico
router.get('/user/:user_id', expensesController.getExpensesByUserId);

module.exports = router;
