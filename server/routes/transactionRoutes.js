import express from 'express';
import { addTransaction, getTransactions,getMonthlySummary } from '../controllers/transactionController.js';

const router = express.Router();
router.route('/').post(addTransaction)
router.route('/').get(getTransactions);
router.route('/summary/:year/:month').get(getMonthlySummary);

export default router;