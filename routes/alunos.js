const express = require('express');
const router = express.Router();

// Exemplo de rota para listar alunos
router.get('/', (req, res) => {
  // Renderiza a view de alunos (views/alunos/index.ejs)
  res.render('alunos/index', { alunos: [] });
});

// Você pode adicionar mais rotas conforme necessário

module.exports = router;
