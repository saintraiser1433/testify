import { Router } from 'express';
import {
  getSummaryByExaminee,
  getAllResult,
  fetchExamineeRank,
} from '../controllers/results.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const route = Router();
// authenticateToken

route.get('/rank/:examineeId', fetchExamineeRank);
route.get('/:examineeId', getSummaryByExaminee);
route.get('/', getAllResult);

export default route;
