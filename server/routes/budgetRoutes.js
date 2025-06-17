import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  getBudgetUsageThisMonth
} from '../controllers/budgetController.js';

const router = express.Router();

router.post('/', auth, addBudget);
router.get('/', auth, getBudgets);
router.put('/:id', auth, updateBudget);
router.delete('/:id', auth, deleteBudget);
router.get('/status', auth, getBudgetUsageThisMonth);


export default router;
