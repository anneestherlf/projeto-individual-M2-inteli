const express = require('express');
const router = express.Router();
const toDoListItemController = require('../controllers/to_do_list_itemController');

router.get('/', toDoListItemController.getAllItems);
router.get('/:id', toDoListItemController.getItemById);
router.post('/', toDoListItemController.createItem);
router.get('/user/:user_id', toDoListItemController.getItemsByUserId);

module.exports = router;