import { Router } from 'express';
import {
    getExaminee,
    insertExaminee,
    updateExaminee,
    deleteExaminee,
    insertBulkExaminee,
} from '../controllers/examinee.controller';
import { authenticateToken } from '../middlewares/auth.middleware';



const route = Router();


route.get('/', getExaminee);

route.post('/bulk', insertBulkExaminee);
route.post('/', insertExaminee);
route.put('/:id', updateExaminee);
route.delete('/:id', deleteExaminee)

export default route;