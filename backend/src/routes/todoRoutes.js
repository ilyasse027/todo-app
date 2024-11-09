const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Définir les routes CRUD pour les todos
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById); // Ajout de la route pour obtenir une tâche par ID
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
