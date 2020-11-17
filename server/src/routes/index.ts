import { Router } from 'express';
import {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    spider,
} from '../controllers/todos';

const router: Router = Router();

router.get('/todos', getTodos);

router.post('/add-todo', addTodo);

router.put('/edit-todo/:id', updateTodo);

router.delete('/delete-todo/:id', deleteTodo);

router.get('/spider/:type', spider);

export default router;
