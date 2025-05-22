// Importa o serviço responsável pela lógica de usuários
const userService = require('../services/userService');

// Controlador para buscar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users); // Retorna todos os usuários em formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar um usuário pelo ID
const getUserById = async (req, res) => {
  try {
    // Busca o usuário pelo ID passado na URL
    const user = await userService.getUserById(Number(req.params.id));
    if (user) {
      res.status(200).json(user); // Usuário encontrado
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' }); // Usuário não existe
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Atualizar um usuário
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await userService.updateUser(id, name, email);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um usuário
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    if (deleted) {
      res.status(200).json({ message: 'Usuário deletado' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para criar um novo usuário
const createUser = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { name, email } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos
    if (!name || !email) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
    }
    // Cria o novo usuário usando o serviço
    const newUser = await userService.createUser(name, email);
    res.status(201).json(newUser); // Retorna o usuário criado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};