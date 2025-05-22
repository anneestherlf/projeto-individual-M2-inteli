// Script para executar um arquivo SQL (init.sql) no banco de dados PostgreSQL
const fs = require('fs'); // Módulo para ler arquivos do sistema
const path = require('path'); // Módulo para manipular caminhos de arquivos
const { Pool } = require('pg'); // Pool de conexões do PostgreSQL
require('dotenv').config(); // Carrega variáveis de ambiente do .env

// Cria um pool de conexões com as configurações do .env
const pool = new Pool({
  user: process.env.DB_USER, // Usuário do banco
  host: process.env.DB_HOST, // Host do banco
  database: process.env.DB_DATABASE, // Nome do banco
  password: process.env.DB_PASSWORD, // Senha do banco
  port: process.env.DB_PORT, // Porta do banco
  ssl: {
    rejectUnauthorized: false, // Permite SSL sem verificação de certificado (útil para cloud)
  },
});

// Função principal para rodar o script SQL
const runSQLScript = async () => {
  const filePath = path.join(__dirname, 'init.sql'); // Caminho do arquivo SQL
  const sql = fs.readFileSync(filePath, 'utf8'); // Lê o conteúdo do arquivo SQL

  try {
    await pool.query(sql); // Executa o script SQL no banco
    console.log('Script SQL executado com sucesso!'); // Mensagem de sucesso
  } catch (err) {
    console.error('Erro ao executar o script SQL:', err); // Mensagem de erro
  } finally {
    await pool.end(); // Encerra o pool de conexões
  }
};

// Executa a função ao rodar o script
runSQLScript();
