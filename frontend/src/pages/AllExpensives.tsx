import { useEffect, useState } from "react";
import type { Expense } from "../types/expensive";
import ExpensiveCard from "../components/ExpensiveCard";
function AllExpensives() {
const [expenses, setExpenses] = useState<Expense[]>([]);
useEffect(() => {
   fetch('http://localhost:3000/api/expenses')
   .then(response => response.json())
   .then(data => setExpenses(data.expenses))
   .catch(error => console.error('Error fetching expenses:', error));
}, []);
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <h1 className="text-2xl font-bold text-center text-black mb-4">All Expensives</h1>
            {expenses.map((expense) => (
                <div key={expense._id} className="bg-white-500 text-black text-left p-4 rounded-md shadow-md">
                    <ExpensiveCard expense={expense}  />
                </div>
            ))}
        </div>
    )
}
export default AllExpensives;