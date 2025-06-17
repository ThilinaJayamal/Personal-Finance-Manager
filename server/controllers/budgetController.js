import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

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
      { category, amount },
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




export const getBudgetUsageThisMonth = async (req, res) => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-based

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 1);

    // Fetch all budgets
    const budgets = await Budget.find({ user: req.user._id });

    // Get expenses by category this month
    const expenseAgg = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          type: 'Expense',
          date: { $gte: startOfMonth, $lt: endOfMonth },
        }
      },
      {
        $group: {
          _id: '$category',
          totalSpent: { $sum: '$amount' }
        }
      }
    ]);

    const expenseMap = {};
    expenseAgg.forEach((e) => {
      expenseMap[e._id] = e.totalSpent;
    });

    // Per-category report
    const report = budgets.map(budget => {
      const spent = expenseMap[budget.category] || 0;
      const remaining = budget.amount - spent;
      const percentLeft = budget.amount === 0 ? 0 : ((remaining / budget.amount) * 100).toFixed(2);

      return {
        category: budget.category,
        allocated: budget.amount,
        spent,
        remaining,
        percentLeft
      };
    });

    // Global totals
    const totalBudget = budgets.reduce((acc, b) => acc + b.amount, 0);
    const totalSpent = report.reduce((acc, b) => acc + b.spent, 0);
    const remaining = totalBudget - totalSpent;
    const percentUsed = totalBudget === 0 ? 0 : ((totalSpent / totalBudget) * 100).toFixed(2);

    res.json({
      month: month + 1,
      year,
      report,
      total: {
        totalBudget,
        totalSpent,
        remaining,
        percentUsed
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get budget summary' });
  }
};