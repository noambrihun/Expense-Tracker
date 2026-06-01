import { useEffect, useState } from "react";
import type { Expense } from "../types/expensive";
import ExpensiveCard from "../components/ExpensiveCard";
function AllExpensives() {
const [expenses, setExpenses] = useState<Expense[]>([]);
const [search, setSearch] = useState('');
useEffect(() => {
   fetch('http://localhost:3000/api/expenses')
   .then(response => response.json())
   .then(data => setExpenses(data.expenses))
   .catch(error => console.error('Error fetching expenses:', error));
}, []);

 const deleteExpense = async (id: string) => {
    await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: 'DELETE',
    });
    setExpenses((prev) => prev.filter((expense) => expense._id !== id));
 }
 const updateExpense = async (updated: Expense) => {
    try {
        const { _id, title, category, amount, description } = updated;
        const response = await fetch(`http://localhost:3000/api/expenses/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, category, amount, description }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        setExpenses((prev) => prev.map((e) => (e._id === _id ? data.updatedExpense : e)));
    } catch (error) {
        console.error('Error updating expense:', error);
    }
 };
    return (

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <h1 className="text-2xl font-bold text-center text-black mb-4">All Expensives</h1>
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="border text-black border-gray-300 rounded-md p-2" />
            {expenses
            .filter((expense) => expense.title.toLowerCase().includes(search.toLowerCase()) || expense.category.toLowerCase().includes(search.toLowerCase()))
            .map((expense) => (
                <div key={expense._id} className="bg-white-500 text-black text-left p-4 rounded-md shadow-md">
                    <ExpensiveCard expense={expense} onDelete={deleteExpense} onUpdate={updateExpense} />

                </div>
            ))}
        </div>
    )
}
export default AllExpensives;