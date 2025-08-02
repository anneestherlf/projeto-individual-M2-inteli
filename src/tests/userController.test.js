// Testes unitários para o userController
// Verifica se os métodos do controller retornam as respostas corretas para cada operação

const userController = require('../controllers/userController'); // Importa o controller de usuários
const userService = require('../services/userService'); // Importa o service de usuários (mockado)

jest.mock('../services/userService'); // Mocka o service para isolar o controller

describe('userController', () => {
  let req, res;

  // Antes de cada teste, inicializa objetos mock de req e res
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(), // Permite encadear status().json()
      json: jest.fn(),
    };
  });

  // Testa se getAllUsers retorna todos os usuários corretamente
  test('getAllUsers deve retornar todos os usuários', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ];
    userService.getAllUsers.mockResolvedValueOnce(mockUsers);

    await userController.getAllUsers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  // Testa se getUserById retorna o usuário correto
  test('getUserById deve retornar o usuário correto', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    req.params = { id: '1' };
    userService.getUserById.mockResolvedValueOnce(mockUser);

    await userController.getUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  // Testa se createUser retorna o usuário criado corretamente
  test('createUser deve criar um novo usuário', async () => {
    const newUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    req.body = { name: 'John Doe', email: 'john@example.com' };
    userService.createUser.mockResolvedValueOnce(newUser);

    await userController.createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  // Testa se updateUser retorna o usuário atualizado corretamente
  test('updateUser deve atualizar um usuário', async () => {
    const updatedUser = { id: '1', name: 'John Doe', email: 'john_updated@example.com' };
    req.params = { id: '1' };
    req.body = { name: 'John Doe', email: 'john_updated@example.com' };
    userService.updateUser.mockResolvedValueOnce(updatedUser);

    await userController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });

  // Testa se deleteUser retorna a mensagem de sucesso ao deletar
  test('deleteUser deve deletar um usuário', async () => {
    const deletedUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    req.params = { id: '1' };
    userService.deleteUser.mockResolvedValueOnce(deletedUser);

    await userController.deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário deletado' });
  });
});
