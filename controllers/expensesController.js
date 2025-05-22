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
    // Sempre usa o userId da sessão, ignorando user_id_FK do body
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const { value_expense, description_expense, date_expense, category_expense } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos e são válidos
    if (
      typeof value_expense !== 'number' ||
      !description_expense ||
      !date_expense ||
      !category_expense
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    // Cria a nova despesa usando o serviço
    const newExpense = await expensesService.createExpense({
      value_expense,
      description_expense,
      date_expense,
      category_expense,
      user_id_FK: Number(userId)
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

// Controlador para buscar todas as despesas do usuário logado
const getExpensesByLoggedUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const expenses = await expensesService.getExpensesByUserId(Number(userId));
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para atualizar uma despesa do usuário logado
const updateExpense = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const expenseId = Number(req.params.id);
    // Busca a despesa e verifica se pertence ao usuário logado
    const expense = await expensesService.getExpenseById(expenseId);
    if (!expense || expense.user_id_FK !== userId) {
      return res.status(404).json({ error: 'Despesa não encontrada ou acesso negado' });
    }
    // Extrai os dados do corpo da requisição
    const { value_expense, description_expense, date_expense, category_expense } = req.body;
    // Atualiza a despesa
    const updated = await expensesService.updateExpense({
      expense_id_PK: expenseId,
      value_expense,
      description_expense,
      date_expense,
      category_expense,
      user_id_FK: userId
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para deletar uma despesa do usuário logado
const deleteExpense = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    const expenseId = Number(req.params.id);
    // Busca a despesa e verifica se pertence ao usuário logado
    const expense = await expensesService.getExpenseById(expenseId);
    if (!expense || expense.user_id_FK !== userId) {
      return res.status(404).json({ error: 'Despesa não encontrada ou acesso negado' });
    }
    // Deleta a despesa
    await expensesService.deleteExpense(expenseId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllExpenses, // Apenas para debug/admin, não use no frontend
  getExpenseById, // Apenas para debug/admin, não use no frontend
  createExpense: async (req, res) => {
    try {
      // Sempre usa o userId da sessão, ignorando user_id_FK do body
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ error: 'Não autenticado' });
      const { value_expense, description_expense, date_expense, category_expense } = req.body;
      if (
        typeof value_expense !== 'number' ||
        !description_expense ||
        !date_expense ||
        !category_expense
      ) {
        return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
      }
      const newExpense = await expensesService.createExpense({
        value_expense,
        description_expense,
        date_expense,
        category_expense,
        user_id_FK: Number(userId)
      });
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getExpensesByUserId, // Apenas para debug/admin, não use no frontend
  getExpensesByLoggedUser, // Use esta rota para listar despesas do usuário logado
  updateExpense, // Atualiza despesa do usuário logado
  deleteExpense // Deleta despesa do usuário logado
};