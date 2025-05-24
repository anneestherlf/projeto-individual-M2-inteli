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

// Rotas de API
const userRoutes = require('./routes/userRoutes');
const toDoListItemRoutes = require('./routes/to_do_list_itemRoutes');
const goalsRoutes = require('./routes/goalsRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const earningsRoutes = require('./routes/earningsRoutes');

app.use('/users', userRoutes);
app.use('/to_do_list_items', toDoListItemRoutes);
app.use('/goals', goalsRoutes);
app.use('/expenses', expensesRoutes);
app.use('/earnings', earningsRoutes);

// Rotas de frontend devem ser registradas por último
const frontendRoutes = require('./routes/frontRoutes');
app.use('/', frontendRoutes);

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
