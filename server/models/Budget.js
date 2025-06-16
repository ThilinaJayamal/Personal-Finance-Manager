import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
});

export default mongoose.model('Budget', BudgetSchema);