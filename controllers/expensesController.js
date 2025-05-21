// Importa o serviço responsável pela lógica das despesas (expenses)
const expensesService = require('../services/expensesService');

// Controlador para buscar todas as despesas
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expensesService.getAllExpenses();
    res.status(200).json(expenses); // Retorna todas as despesas em formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar uma despesa pelo ID
const getExpenseById = async (req, res) => {
  try {
    // Busca a despesa pelo ID passado na URL
    const expense = await expensesService.getExpenseById(Number(req.params.id));
    if (expense) {
      res.status(200).json(expense); // Despesa encontrada
    } else {
      res.status(404).json({ error: 'Despesa não encontrada' }); // Despesa não existe
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para criar uma nova despesa
const createExpense = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { value_expense, description_expense, date_expense, category_expense, user_id_FK } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos e são válidos
    if (
      typeof value_expense !== 'number' ||
      !description_expense ||
      !date_expense ||
      !category_expense ||
      !user_id_FK
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    // Cria a nova despesa usando o serviço
    const newExpense = await expensesService.createExpense({
      value_expense,
      description_expense,
      date_expense,
      category_expense,
      user_id_FK: Number(user_id_FK)
    });
    res.status(201).json(newExpense); // Retorna a despesa criada
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar todas as despesas de um usuário específico
const getExpensesByUserId = async (req, res) => {
  try {
    const expenses = await expensesService.getExpensesByUserId(Number(req.params.user_id));
    res.status(200).json(expenses); // Retorna as despesas do usuário
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  getExpensesByUserId
};