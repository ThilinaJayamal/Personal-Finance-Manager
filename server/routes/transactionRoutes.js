import express from 'express';
import {
    addTransaction,
    getTransactions,
    getMonthlySummary,
    getMonthlyIncomeExpenseSummary
} from '../controllers/transactionController.js';

const router = express.Router();
router.route('/').post(addTransaction)
router.route('/').get(getTransactions);
router.route('/summary/:year/:month').get(getMonthlySummary);
router.get('/monthly-summary', getMonthlyIncomeExpenseSummary);
export default router;