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

// Controlador para criar um novo usuário
const createUser = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { user_name, user_email, user_password } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos
    if (!user_name || !user_email || !user_password) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
    }
    // Cria o novo usuário usando o serviço
    const newUser = await userService.createUser({ user_name, user_email, user_password });
    res.status(201).json(newUser); // Retorna o usuário criado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllUsers,
  getUserById,
  createUser
};