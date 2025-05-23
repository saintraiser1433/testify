import { Router } from 'express';
import {
    getAllCourse,
    getCourseNoAssociated,
    insert,
    update,
    remove
} from '../controllers/course.controller';
import { authenticateToken } from '../middlewares/auth.middleware';


const route = Router();


route.get('/', getAllCourse);
route.get('/filtered', getCourseNoAssociated);
route.post('/', insert);
route.put('/:id', update);
route.delete('/:id', remove)

export default route;