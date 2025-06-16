import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true,unique:true },
  amount: { type: Number, required: true },
});

export default mongoose.model('Budget', BudgetSchema);