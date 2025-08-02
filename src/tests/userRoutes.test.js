// Testes de integração para as rotas de usuário (User Routes)
// Verifica se os endpoints da API REST de usuários respondem corretamente

// Importa as dependências necessárias para os testes
const request = require('supertest'); // Biblioteca para testar requisições HTTP
const express = require('express'); // Framework web para criar a aplicação de teste
const userRoutes = require('../routes/userRoutes'); // Rotas de usuário a serem testadas
const db = require('../config/db'); // Mock do banco de dados

// Cria uma instância do app Express para os testes
const app = express();
app.use(express.json()); // Permite receber JSON nas requisições
app.use('/users', userRoutes); // Registra as rotas de usuário

// Mocka o módulo de banco de dados para evitar acesso real ao banco
jest.mock('../config/db');

// Início da suíte de testes para as rotas de usuário
// Cada teste verifica um endpoint específico da API REST

describe('User Routes', () => {
  // Testa o endpoint GET /users para listar todos os usuários
  test('GET /users deve retornar todos os usuários', async () => {
    // Simula o retorno do banco de dados
    db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });

    // Faz a requisição para o endpoint
    const res = await request(app).get('/users');

    // Verifica se o status e o corpo da resposta estão corretos
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
  });

  // Testa o endpoint GET /users/:id para buscar um usuário pelo ID
  test('GET /users/:id deve retornar um usuário pelo ID', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });

    const res = await request(app).get('/users/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  // Testa o endpoint POST /users para criar um novo usuário
  test('POST /users deve criar um novo usuário', async () => {
    db.query.mockResolvedValue({
      rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
    });

    const res = await request(app).post('/users').send({ name: 'John Doe', email: 'john@example.com' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  // Testa o endpoint PUT /users/:id para atualizar um usuário existente
  test('PUT /users/:id deve atualizar um usuário', async () => {
    db.query.mockResolvedValue({
      rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
    });

    const res = await request(app).put('/users/1').send({ name: 'John Doe', email: 'john@example.com' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  // Testa o endpoint DELETE /users/:id para deletar um usuário
  test('DELETE /users/:id deve deletar um usuário', async () => {
    // Mocka o retorno do banco para simular que o usuário existe e foi deletado
    db.query
      .mockResolvedValueOnce({ rows: [{ user_id_PK: 1, user_name: 'John Doe', user_email: 'john@example.com' }] }) // getUserById
      .mockResolvedValueOnce({}); // DELETE

    const res = await request(app).delete('/users/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Usuário deletado' });
  });
});
