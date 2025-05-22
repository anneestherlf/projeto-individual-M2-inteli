// Importa o framework Express para criar rotas HTTP
const express = require('express');
const router = express.Router(); // Cria um roteador específico para itens de lista de tarefas
const toDoListItemController = require('../controllers/to_do_list_itemController'); // Importa o controller responsável pela lógica

// Rota para buscar todos os itens de tarefas
router.get('/', toDoListItemController.getAllItems);
// Rota para buscar um item de tarefa pelo ID
router.get('/:id', toDoListItemController.getItemById);
// Rota para criar um novo item de tarefa
router.post('/', toDoListItemController.createItem);
// Rota para buscar todos os itens de tarefa de um usuário específico
router.get('/user/:user_id', toDoListItemController.getItemsByUserId);

// Exporta o roteador para ser usado no app principal
module.exports = router;