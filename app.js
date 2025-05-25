const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Configuração de sessão
app.use(session({
  secret: 'financeu-secret',
  resave: false,
  saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas de API
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const toDoListItemRoutes = require('./routes/to_do_list_itemRoutes');
app.use('/to-do-list-items', toDoListItemRoutes);

const earningsRoutes = require('./routes/earningsRoutes');
app.use('/earnings', earningsRoutes);

const goalsRoutes = require('./routes/goalsRoutes');
app.use('/api/goals', goalsRoutes);

// Rota para renderizar a página de metas (visual)
app.get('/goals', (req, res) => {
  res.render('pages/goals');
});

// Rotas de frontend devem vir por último
const frontendRoutes = require('./routes/frontRoutes');
app.use('/', frontendRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});