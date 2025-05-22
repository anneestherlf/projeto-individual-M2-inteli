const express = require('express');
const router = express.Router();

// Middleware para proteger rotas que exigem login
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// Rota para exibir tela de login
router.get('/login', (req, res) => {
  res.render('pages/login', { error: null });
});

// Rota para exibir tela de cadastro
router.get('/register', (req, res) => {
  res.render('pages/register', { error: null });
});

// Dashboard
router.get('/dashboard', requireLogin, (req, res) => {
  res.render('pages/home', { userId: req.session.userId });
});

// Ganhos
router.get('/earnings', requireLogin, (req, res) => res.render('pages/earnings', { userId: req.session.userId }));

// Despesas
router.get('/expenses', requireLogin, (req, res) => res.render('pages/expenses', { userId: req.session.userId }));

// Metas
router.get('/goals', requireLogin, (req, res) => res.render('pages/goals', { userId: req.session.userId }));

// Tarefas
router.get('/to_do_list_items', requireLogin, (req, res) => res.render('pages/to_do_list_items', { userId: req.session.userId }));

// Rota para processar login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userService = require('../services/userService');
  // Busca usuário pelo email
  const users = await userService.getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } else {
    res.render('pages/login', { error: 'E-mail ou senha inválidos.' });
  }
});

// Rota para processar cadastro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const userService = require('../services/userService');
  // Verifica se já existe usuário com o mesmo email
  const users = await userService.getAllUsers();
  if (users.find(u => u.email === email)) {
    return res.render('pages/register', { error: 'E-mail já cadastrado.' });
  }
  // Cria o usuário
  await userService.createUser(name, email, password);
  res.redirect('/login');
});

// Rota para logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Rota para a página inicial
router.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

// Rota para exibir página de perfil do usuário logado
router.get('/profile', requireLogin, async (req, res) => {
  const userService = require('../services/userService');
  const user = await userService.getUserById(req.session.userId);
  res.render('pages/profile', { user, success: null }); // Garante que success sempre existe
});

// Rota para atualizar dados do perfil do usuário logado
router.post('/profile', requireLogin, async (req, res) => {
  const userService = require('../services/userService');
  const { name, email, password } = req.body;
  await userService.updateUser(req.session.userId, name, email, password);
  const user = await userService.getUserById(req.session.userId);
  res.render('pages/profile', { user, success: 'Dados atualizados com sucesso!' });
});

module.exports = router;
