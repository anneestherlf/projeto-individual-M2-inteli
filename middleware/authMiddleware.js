// Middleware para proteger rotas que exigem autenticação de usuário
function requireLogin(req, res, next) {
  if (req.session && req.session.userId) {
    // Usuário autenticado, pode prosseguir
    return next();
  }
  // Usuário não autenticado, redireciona para login ou retorna erro
  if (req.accepts('html')) {
    return res.redirect('/login');
  } else {
    return res.status(401).json({ error: 'Não autenticado' });
  }
}

module.exports = { requireLogin };
