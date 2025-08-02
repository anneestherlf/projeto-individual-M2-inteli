// Importa o framework Express para criar rotas HTTP
const express = require('express');
const router = express.Router(); // Cria um roteador para as rotas de usuário
const userController = require('../controllers/userController'); // Importa o controller com a lógica dos usuários

// Rota para listar todos os usuários (GET /users)
router.get('/', userController.getAllUsers);
// Rota para buscar um usuário pelo ID (GET /users/:id)
router.get('/:id', userController.getUserById);
// Rota para criar um novo usuário (POST /users)
router.post('/', userController.createUser);
// Rota para atualizar um usuário existente (PUT /users/:id)
router.put('/:id', userController.updateUser);
// Rota para deletar um usuário (DELETE /users/:id)
router.delete('/:id', userController.deleteUser);

// Exporta o roteador para ser usado no app principal
module.exports = router;