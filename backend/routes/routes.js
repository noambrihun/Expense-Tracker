const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json({ message: 'Expenses fetched successfully', expenses });
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch expenses', error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { title, category, amount, description, date } = req.body;
    try {
        const expense = new Expense({ title, category, amount, description, date });
        await expense.save();
        res.status(201).json({ message: 'Expense created successfully', expense });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create expense', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
   try{
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully', deletedExpense });
   } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense', error: error.message });
   }
});

router.patch('/:id', async (req, res) => {
    try{
        const {title, category, amount, description, date} = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, {title, category, amount, description, date}, {new: true});
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense updated successfully', updatedExpense });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update expense', error: error.message });
    }
})

module.exports = router;