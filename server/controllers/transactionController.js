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
