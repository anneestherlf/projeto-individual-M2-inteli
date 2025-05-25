require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'financeu-secret',
  resave: false,
  saveUninitialized: false,
}));

// Rotas de frontend devem ser registradas PRIMEIRO para views
const frontendRoutes = require('./routes/frontRoutes');
app.use('/', frontendRoutes);

// Rotas de API (registradas depois com prefixo /api para evitar conflitos)
const userRoutes = require('./routes/userRoutes');
const toDoListItemRoutes = require('./routes/to_do_list_itemRoutes');
const goalsRoutes = require('./routes/goalsRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const earningsRoutes = require('./routes/earningsRoutes');

app.use('/api/users', userRoutes);
app.use('/api/to-do-list-items', toDoListItemRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/earnings', earningsRoutes);

// Middleware para lidar com erros de rota não encontrada
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada');
});

// Middleware para lidar com erros internos do servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro no servidor');
});

const PORT = process.env.PORT || 3000;
db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
