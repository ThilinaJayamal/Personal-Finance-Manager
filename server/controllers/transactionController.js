import Transaction from '../models/Transaction.js';

export const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body, user: req.user.id });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getMonthlySummary = async (req, res) => {
  try {
    const { year, month } = req.params;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    const transactions = await Transaction.find({
      user: req.user.id,
      date: { $gte: start, $lte: end }
    });

    let income = 0;
    let expense = 0;
    const categorySummary = {};

    // Process each transaction in one loop
    for (const t of transactions) {
      if (t.type === 'Income') {
        income += t.amount;
      } else if (t.type === 'Expense') {
        expense += t.amount;
        categorySummary[t.category] = (categorySummary[t.category] || 0) + t.amount;
      }
    }

    const balance = income - expense;
    const savingRate = income > 0 ? ((balance / income) * 100).toFixed(2) : '0.00';

    const categoryBreakdown = Object.entries(categorySummary).map(([category, amount]) => ({
      category,
      amount,
      percent: expense > 0 ? ((amount / expense) * 100).toFixed(2) : '0.00'
    }));

    res.json({ income, expense, balance, savingRate, categoryBreakdown });

  } catch (error) {
    console.error('Monthly summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};