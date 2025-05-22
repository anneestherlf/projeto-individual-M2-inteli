// Testes unitários para o userService
// Verifica se o service de usuário chama corretamente os métodos do model

const userService = require('../services/userService'); // Importa o service de usuário
const userModel = require('../models/userModel'); // Importa o model de usuário (mockado)

jest.mock('../models/userModel'); // Mocka o model para isolar o service

describe('userService', () => {
  // Testa se getAllUsers chama o model corretamente
  test('getAllUsers deve retornar todos os usuários', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ];
    userModel.getAll.mockResolvedValueOnce(mockUsers);
    const users = await userService.getAllUsers();
    expect(users).toEqual(mockUsers);
  });

  // Testa se getUserById chama o model corretamente
  test('getUserById deve retornar o usuário correto', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    userModel.getById.mockResolvedValueOnce(mockUser);
    const user = await userService.getUserById('1');
    expect(user).toEqual(mockUser);
  });

  // Testa se createUser chama o model corretamente
  test('createUser deve criar um novo usuário', async () => {
    const newUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    userModel.create.mockResolvedValueOnce(newUser);
    const user = await userService.createUser('John Doe', 'john@example.com');
    expect(user).toEqual(newUser);
  });

  // Testa se updateUser chama o model corretamente
  test('updateUser deve atualizar um usuário', async () => {
    const updatedUser = { id: '1', name: 'John Doe', email: 'john_updated@example.com' };
    userModel.update.mockResolvedValueOnce(updatedUser);
    const user = await userService.updateUser('1', 'John Doe', 'john_updated@example.com');
    expect(user).toEqual(updatedUser);
  });

  // Testa se deleteUser chama o model corretamente
  test('deleteUser deve deletar um usuário', async () => {
    const deletedUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    userModel.delete.mockResolvedValueOnce(deletedUser);
    const result = await userService.deleteUser('1');
    expect(result).toEqual(deletedUser);
  });
});
