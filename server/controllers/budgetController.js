import Budget from '../models/Budget.js';

export const addBudget = async (req, res) => {
  try {
    const { category, amount, month } = req.body;
    const user = req.user._id;

    const budget = await Budget.create({ user, category, amount, month });
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { category, amount},
      { new: true }
    );

    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findOneAndDelete({ _id: id, user: req.user._id });

    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    res.status(200).json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
