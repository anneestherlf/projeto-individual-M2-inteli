// Configuração da conexão com o banco de dados PostgreSQL usando o pacote 'pg'
const { Pool } = require('pg');
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

// Verifica se a conexão deve usar SSL 
const isSSL = process.env.DB_SSL === 'true';

// Cria um pool de conexões com as configurações vindas das variáveis de ambiente
const pool = new Pool({
  user: process.env.DB_USER, // Usuário do banco
  host: process.env.DB_HOST, // Host do banco
  database: process.env.DB_DATABASE, // Nome do banco
  password: process.env.DB_PASSWORD, // Senha do banco
  port: process.env.DB_PORT, // Porta do banco
  ssl: isSSL ? { rejectUnauthorized: false } : false, // Configuração SSL opcional
});

// Exporta funções utilitárias para uso em outros arquivos
module.exports = {
  // Função para executar queries SQL (usada em models/services)
  query: (text, params) => pool.query(text, params),
  // Função para obter uma conexão direta do pool (casos avançados)
  connect: () => pool.connect(),
};
