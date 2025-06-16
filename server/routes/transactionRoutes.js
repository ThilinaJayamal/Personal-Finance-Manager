import express from 'express';
import { addTransaction, getTransactions } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);
router.route('/').post(addTransaction).get(getTransactions);

export default router;