const express = require('express');
const router = express.Router();
const toDoListItemController = require('../controllers/to_do_list_itemController');

router.get('/', toDoListItemController.getAllItems);
router.get('/:id', toDoListItemController.getItemById);
router.post('/', toDoListItemController.createItem);
router.get('/user/:user_id', toDoListItemController.getItemsByUserId);

module.exports = router;

// O cadastro de usuário em userRoutes.js cria apenas o usuário.
// As outras tabelas (expenses, earnings, goals, to_do_list_item) têm um campo de chave estrangeira (user_id_FK) que faz referência ao usuário cadastrado. Assim, cada despesa, ganho, meta ou tarefa pode ser associada a um usuário específico, permitindo que cada conta tenha seus próprios dados nessas tabelas.