import { useEffect, useState } from "react";
import type { Expense } from "../types/expensive";
type ExpensiveCardProps = {
        expense: Expense;
}
function ExpensiveCard({ expense }: ExpensiveCardProps) {
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
        <div>
            <h1 className="text-lg font-bold text-black mb-2"> Title: {title}</h1>
            <p className="text-sm text-gray-500"> Category: {category}</p>
            <p className="text-sm text-gray-500"> Amount: {amount}</p>
            <p className="text-sm text-gray-500"> Description: {description}</p>
        </div>
    )
}
export default ExpensiveCard;