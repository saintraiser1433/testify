import { Router } from 'express';
import {
  getSummaryByExaminee,
  getAllResult,
  fetchExamineeRank,
} from '../controllers/results.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const route = Router();
// authenticateToken

route.get('/rank/:examineeId', authenticateToken, fetchExamineeRank);
route.get('/:examineeId', authenticateToken, getSummaryByExaminee);
route.get('/', authenticateToken, getAllResult);

export default route;
