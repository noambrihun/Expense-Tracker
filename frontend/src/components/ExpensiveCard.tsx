import { useEffect, useState } from "react";
import type { Expense } from "../types/expensive";
type ExpensiveCardProps = {
        expense: Expense;
        onDelete: (id: string) => void;
        onUpdate: (expense: Expense) => void;
}
function ExpensiveCard({ expense, onDelete, onUpdate }: ExpensiveCardProps) {
    const [title, setTitle] = useState(expense.title);
    const [category, setCategory] = useState(expense.category);
    const [amount, setAmount] = useState(expense.amount);
    const [description, setDescription] = useState(expense.description);

    useEffect(() => {
        setTitle(expense.title);
        setCategory(expense.category);
        setAmount(expense.amount);
        setDescription(expense.description);
    },[expense])
    return (
        <div className="flex flex-col gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-black"
                placeholder="Title"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-black"
                placeholder="Category"
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-2 text-black"
                placeholder="Amount"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-black"
                placeholder="Description"
            />
            <div className="flex gap-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => onDelete(expense._id)}>Delete</button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() =>
                        onUpdate({
                            ...expense,
                            title,
                            category,
                            amount: Number(amount),
                            description,
                        })
                    }
                >
                    Update
                </button>
            </div>
        </div>
    )
}
export default ExpensiveCard;