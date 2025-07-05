import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
  category: String, // for Stage 2
})

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)
