const expensesService = require('../services/expensesService');

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expensesService.getAllExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await expensesService.getExpenseById(Number(req.params.id));
    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).json({ error: 'Despesa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const { value_expense, description_expense, date_expense, category_expense, user_id_FK } = req.body;
    if (
      typeof value_expense !== 'number' ||
      !description_expense ||
      !date_expense ||
      !category_expense ||
      !user_id_FK
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    const newExpense = await expensesService.createExpense({
      value_expense,
      description_expense,
      date_expense,
      category_expense,
      user_id_FK: Number(user_id_FK)
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpensesByUserId = async (req, res) => {
  try {
    const expenses = await expensesService.getExpensesByUserId(Number(req.params.user_id));
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  getExpensesByUserId
};