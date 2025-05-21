const express = require('express');
const router = express.Router();

// Dashboard
router.get('/', (req, res) => {
  res.render('pages/home');
});

// Ganhos
router.get('/earnings', (req, res) => {
  res.render('pages/earnings');
});

// Despesas
router.get('/expenses', (req, res) => {
  res.render('pages/expenses');
});

// Metas
router.get('/goals', (req, res) => {
  res.render('pages/goals');
});

// Tarefas
router.get('/to_do_list_items', (req, res) => {
  res.render('pages/to_do_list_items');
});

module.exports = router;
