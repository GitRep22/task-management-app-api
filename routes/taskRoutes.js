const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management API
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks.
 *       500:
 *         description: Internal server error.
 */
router.get('/', taskController.getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a specific task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task data retrieved successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', taskController.getTaskById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Task"
 *               status:
 *                 type: string
 *                 enum: ["To Do", "In Progress", "Completed"]
 *                 example: "To Do"
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', taskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Task"
 *               status:
 *                 type: string
 *                 enum: ["To Do", "In Progress", "Completed"]
 *                 example: "In Progress"
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;
