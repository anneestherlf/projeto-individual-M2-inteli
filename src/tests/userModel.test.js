// Testes unitários para o userModel
// Verifica se os métodos do model de usuário interagem corretamente com o banco de dados

const db = require('../config/db'); // Importa o módulo de banco de dados (mockado)
const User = require('../models/userModel'); // Importa o model de usuário

jest.mock('../config/db'); // Mocka o banco para isolar o model

describe('User Model', () => {
  // Testa se getAll retorna todos os usuários
  test('deve retornar todos os usuários', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });
    const users = await User.getAll();
    expect(users).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
  });

  // Testa se getById retorna o usuário correto
  test('deve retornar um usuário pelo ID', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });
    const user = await User.getById(1);
    expect(user).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  // Testa se create cria um novo usuário
  test('deve criar um novo usuário', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });
    const user = await User.create({ name: 'John Doe', email: 'john@example.com' });
    expect(user).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  // Testa se update atualiza um usuário existente
  test('deve atualizar um usuário', async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', email: 'john_updated@example.com' }] });
    const user = await User.update(1, { name: 'John Doe', email: 'john_updated@example.com' });
    expect(user).toEqual({ id: 1, name: 'John Doe', email: 'john_updated@example.com' });
  });

  // Testa se delete retorna true ao deletar um usuário existente
  test('deve deletar um usuário', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] }); // getUserById
    db.query.mockResolvedValueOnce({}); // DELETE
    const isDeleted = await User.delete(1);
    expect(isDeleted).toBe(true);
  });

  // Testa se delete retorna false ao tentar deletar um usuário inexistente
  test('deve retornar false se o usuário não for encontrado para deleção', async () => {
    db.query.mockResolvedValue({ rows: [] }); // getUserById retorna vazio
    const isDeleted = await User.delete(2);
    expect(isDeleted).toBe(false);
  });
});
