const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    amount: {
        type: Number,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
})
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;