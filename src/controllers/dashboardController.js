// Controlador para dashboard - agregação de dados financeiros do usuário
const userService = require('../services/userService');
const earningsService = require('../services/earningsService');
const expensesService = require('../services/expensesService');
const goalsService = require('../services/goalsService');
const toDoListItemService = require('../services/to_do_list_itemService');

// Controlador para obter dados do dashboard do usuário logado
const getDashboardData = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    // Busca dados do usuário
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Busca dados financeiros
    const earnings = await earningsService.getEarningsByUserId(userId);
    const expenses = await expensesService.getExpensesByUserId(userId);
    const goals = await goalsService.getGoalsByUserId(userId);
    const tasks = await toDoListItemService.getItemsByUserId(userId);

    // Calcula totais
    const totalEarnings = earnings.reduce((sum, earning) => sum + parseFloat(earning.value_earning || 0), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.value_expense || 0), 0);
    const balance = totalEarnings - totalExpenses;

    // Processa categorias de despesas
    const expenseCategories = {};
    expenses.forEach(expense => {
      const category = expense.category_expense || 'Outros';
      expenseCategories[category] = (expenseCategories[category] || 0) + parseFloat(expense.value_expense || 0);
    });

    // Converte categorias para array ordenado
    const categoriesArray = Object.entries(expenseCategories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Busca receitas recentes (últimas 5)
    const recentEarnings = earnings
      .sort((a, b) => new Date(b.date_earning) - new Date(a.date_earning))
      .slice(0, 5)
      .map(earning => ({
        date: earning.date_earning,
        description: earning.description_earning,
        category: earning.category_earning,
        value: parseFloat(earning.value_earning),
        status: 'Recebido' // Por enquanto, todas como recebidas
      }));

    // Estatísticas de metas
    const goalsStats = {
      total: goals.length,
      completed: goals.filter(goal => goal.goal_is_completed).length,
      totalValue: goals.reduce((sum, goal) => sum + parseFloat(goal.goal_total_value || 0), 0),
      accumulatedValue: goals.reduce((sum, goal) => sum + parseFloat(goal.goal_accumulated_value || 0), 0)
    };

    // Estatísticas de tarefas
    const tasksStats = {
      total: tasks.length,
      completed: tasks.filter(task => task.to_do_list_item_is_completed).length,
      pending: tasks.filter(task => !task.to_do_list_item_is_completed).length
    };

    // Histórico mensal (últimos 3 meses - mockado por enquanto)
    const monthlyHistory = [
      {
        period: 'Dezembro 2024',
        earnings: totalEarnings,
        expenses: totalExpenses,
        balance: balance,
        savingsRate: totalEarnings > 0 ? Math.round((balance / totalEarnings) * 100) : 0
      },
      {
        period: 'Novembro 2024',
        earnings: totalEarnings * 0.85,
        expenses: totalExpenses * 0.92,
        balance: (totalEarnings * 0.85) - (totalExpenses * 0.92),
        savingsRate: totalEarnings > 0 ? Math.round(((totalEarnings * 0.85 - totalExpenses * 0.92) / (totalEarnings * 0.85)) * 100) : 0
      },
      {
        period: 'Outubro 2024',
        earnings: totalEarnings * 0.78,
        expenses: totalExpenses * 1.05,
        balance: (totalEarnings * 0.78) - (totalExpenses * 1.05),
        savingsRate: totalEarnings > 0 ? Math.round(((totalEarnings * 0.78 - totalExpenses * 1.05) / (totalEarnings * 0.78)) * 100) : 0
      }
    ];

    const dashboardData = {
      user: {
        id: user.user_id_PK || user.id,
        name: user.user_name || user.name,
        email: user.user_email || user.email,
        status: 'Online'
      },
      financial: {
        totalEarnings,
        totalExpenses,
        balance,
        savingsRate: totalEarnings > 0 ? Math.round((balance / totalEarnings) * 100) : 0
      },
      recentEarnings,
      expenseCategories: categoriesArray,
      goals: goalsStats,
      tasks: tasksStats,
      monthlyHistory
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getDashboardData
};
