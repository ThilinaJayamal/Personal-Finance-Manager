import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget
} from '../controllers/budgetController.js';

const router = express.Router();

router.post('/', auth, addBudget);
router.get('/', auth, getBudgets);
router.put('/:id', auth, updateBudget);
router.delete('/:id', auth, deleteBudget);

export default router;
