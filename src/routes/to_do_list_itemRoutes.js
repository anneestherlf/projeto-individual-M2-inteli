// Importa o framework Express para criar rotas HTTP
const express = require('express');
const router = express.Router(); // Cria um roteador específico para itens de lista de tarefas
const toDoListItemController = require('../controllers/to_do_list_itemController'); // Importa o controller responsável pela lógica
const { requireLogin } = require('../middleware/authMiddleware'); // Middleware para verificar se o usuário está logado

// Rota para buscar todos os itens de tarefas
router.get('/', toDoListItemController.getAllItems);
// Rota para buscar itens do usuário logado (deve vir antes de /:id)
router.get('/me', requireLogin, toDoListItemController.getItemsByLoggedUser);
// Rota para criar um novo item de tarefa
router.post('/', toDoListItemController.createItem);
// Rota para buscar todos os itens de tarefa de um usuário específico
router.get('/user/:user_id', toDoListItemController.getItemsByUserId);
// Rota para buscar um item de tarefa pelo ID
router.get('/:id', toDoListItemController.getItemById);
// Rotas protegidas para update e delete de itens do usuário logado
router.put('/:id', requireLogin, toDoListItemController.updateItem);
router.delete('/:id', requireLogin, toDoListItemController.deleteItem);

// Exporta o roteador para ser usado no app principal
module.exports = router;