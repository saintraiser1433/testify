import { Router } from 'express';
import {
  getQuestion,
  insertQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/question.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const route = Router();

route.get('/:id', getQuestion);
route.post('/', insertQuestion);
route.put('/:id', updateQuestion);
route.delete('/:id', deleteQuestion);

export default route;
