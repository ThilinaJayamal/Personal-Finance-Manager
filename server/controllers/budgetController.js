import Budget from '../models/Budget.js';

export const setBudget = async (req, res) => {
  try {
    const budget = await Budget.create({ ...req.body, user: req.user.id });
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create budget' });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch budgets' });
  }
};