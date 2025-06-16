import express from 'express';
import { setBudget, getBudgets } from '../controllers/budgetController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);
router.route('/').post(setBudget).get(getBudgets);

export default router;
