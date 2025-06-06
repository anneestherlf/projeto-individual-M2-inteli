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

// Rota para exibir página de boas-vindas (após login)
router.get('/welcome', requireLogin, (req, res) => {
  res.render('pages/welcome', { error: null });
});

// Dashboard
router.get('/dashboard', requireLogin, (req, res) => {
  res.render('pages/home', { userId: req.session.userId, error: null });
});

// Tutorial page
router.get('/tutorial', requireLogin, (req, res) => {
  res.render('pages/tutorial', { userId: req.session.userId, error: null });
});

// Ganhos
router.get('/earnings', requireLogin, (req, res) => res.render('pages/earnings', { userId: req.session.userId, error: null }));
// Adicionar ganho (salva usando a API REST)
router.post('/earnings', requireLogin, async (req, res) => {
  try {
    const axios = require('axios');
    await axios.post(
      `${req.protocol}://${req.get('host')}/api/earnings`,
      req.body,
      { headers: { Cookie: req.headers.cookie } }
    );
    res.redirect('/earnings');
  } catch (error) {
    res.render('pages/earnings', { userId: req.session.userId, error: 'Erro ao salvar ganho.' });
  }
});

// Despesas
router.get('/expenses', requireLogin, (req, res) => res.render('pages/expenses', { userId: req.session.userId, error: null }));
// Adicionar despesa (salva usando a API REST)
router.post('/expenses', requireLogin, async (req, res) => {
  try {
    // Envia os dados do formulário para a API REST de despesas
    const axios = require('axios');
    const response = await axios.post(
      `${req.protocol}://${req.get('host')}/api/expenses`,
      req.body,
      { headers: { Cookie: req.headers.cookie } }
    );
    // Redireciona de volta para a página de despesas após salvar
    res.redirect('/expenses');
  } catch (error) {
    // Se der erro, renderiza a página com mensagem
    res.render('pages/expenses', { userId: req.session.userId, error: 'Erro ao salvar despesa.' });
  }
});

// Metas
router.get('/goals', requireLogin, (req, res) => res.render('pages/goals', { userId: req.session.userId, error: null }));
router.post('/goals', requireLogin, async (req, res) => {
  try {
    const axios = require('axios');
    await axios.post(
      `${req.protocol}://${req.get('host')}/api/goals`,
      req.body,
      { headers: { Cookie: req.headers.cookie } }
    );
    res.redirect('/goals');
  } catch (error) {
    res.render('pages/goals', { userId: req.session.userId, error: 'Erro ao salvar meta.' });
  }
});

// Tarefas
router.get('/to-do-list-items', requireLogin, (req, res) => res.render('pages/to_do_list_items', { userId: req.session.userId, error: null }));
// POST para criar tarefa (redireciona para view após salvar)
router.post('/to-do-list-items', requireLogin, async (req, res) => {
  try {
    const axios = require('axios');
    await axios.post(
      `${req.protocol}://${req.get('host')}/api/to-do-list-items`,
      req.body,
      { headers: { Cookie: req.headers.cookie } }
    );
    res.redirect('/to-do-list-items');
  } catch (error) {
    res.render('pages/to_do_list_items', { userId: req.session.userId, error: 'Erro ao salvar tarefa.' });
  }
});

// Rota para processar login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userService = require('../services/userService');

  try {
    // Busca usuário pelo email
    const users = await userService.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      req.session.userId = Number(user.id);
      // Se for uma requisição AJAX (JSON), retorna JSON
      if (req.headers['content-type'] === 'application/json') {
        return res.json({ success: true, redirectUrl: '/welcome' });
      }
      return res.redirect('/welcome');
    } else {
      // Se for uma requisição AJAX, retorna erro JSON
      if (req.headers['content-type'] === 'application/json') {
        return res.status(401).json({ error: 'Email e senha não existem.' });
      }
      return res.render('pages/login', { error: 'Email e senha não existem.' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    if (req.headers['content-type'] === 'application/json') {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
    return res.render('pages/login', { error: 'Erro interno do servidor.' });
  }
});

// Rota para processar cadastro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userService = require('../services/userService');

    // Log para debug
    console.log('Tentando cadastrar:', { name, email, password });

    // Verifica se já existe usuário com o mesmo email
    const users = await userService.getAllUsers();
    if (users.find(u => u.email === email)) {
      // Se for uma requisição JSON, retorna erro em JSON
      if (req.headers['content-type'] === 'application/json') {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }
      return res.render('pages/register', { error: 'E-mail já cadastrado.' });
    }

    // Tenta criar o usuário
    const newUser = await userService.createUser(name, email, password);

    // Verifica se o usuário foi criado
    if (newUser) {
      console.log('Novo usuário criado com sucesso:', newUser);

      // Se for uma requisição JSON, retorna sucesso em JSON
      if (req.headers['content-type'] === 'application/json') {
        return res.json({ success: true, redirectUrl: '/login' });
      }

      return res.redirect('/login');
    } else {
      // Se for uma requisição JSON, retorna erro em JSON
      if (req.headers['content-type'] === 'application/json') {
        return res.status(500).json({ error: 'Não foi possível criar o usuário. Tente novamente.' });
      }

      return res.render('pages/register', { error: 'Não foi possível criar o usuário. Tente novamente.' });
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);

    // Se for uma requisição JSON, retorna erro em JSON
    if (req.headers['content-type'] === 'application/json') {
      return res.status(500).json({ error: 'Erro ao criar usuário: ' + error.message });
    }

    return res.render('pages/register', { error: 'Erro ao criar usuário: ' + error.message });
  }
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
