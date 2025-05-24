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

// Rotas de frontend 
const frontendRoutes = require('./routes/frontRoutes');
app.use('/', frontendRoutes);

const earningsRoutes = require('./routes/earningsRoutes');
app.use('/earnings', earningsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});