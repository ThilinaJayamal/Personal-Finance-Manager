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
      name: category,
      //amount,
      value: expense > 0 ? ((amount / expense) * 100) : 0.0
    }));

    res.json({ income, expense, balance, savingRate, categoryBreakdown });

  } catch (error) {
    console.error('Monthly summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




export const getMonthlyIncomeExpenseSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-based index

    // Fetch and group transactions by month and type
    const transactions = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999),
          }
        }
      },
      {
        $project: {
          month: { $month: "$date" }, // 1 - 12
          type: 1,
          amount: 1
        }
      },
      {
        $group: {
          _id: { month: "$month", type: "$type" },
          total: { $sum: "$amount" }
        }
      }
    ]);

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const monthlyData = [];

    for (let i = 0; i <= currentMonth; i++) {
      monthlyData.push({
        month: monthLabels[i],
        income: 0,
        expense: 0
      });
    }

    transactions.forEach(entry => {
      const index = entry._id.month - 1;
      if (entry._id.type === 'Income') {
        monthlyData[index].income = entry.total;
      } else if (entry._id.type === 'Expense') {
        monthlyData[index].expense = entry.total;
      }
    });

    res.status(200).json(monthlyData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};