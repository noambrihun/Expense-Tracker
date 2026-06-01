import { useState} from "react";
import { useNavigate } from "react-router-dom";

function AddExpensive() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, category, amount, description }),
            });
            const data = await response.json();
            console.log(data);
            setTitle('');
            setCategory('');
            setAmount('');
            setDescription('');
            navigate('/');
        }
         catch (error) {
            console.error('Error adding product:', error);
            if(title === '' || category === '' || amount === '' || description === ''){
                alert('Please fill in all fields');
                return;
            }
            if(title.length < 1 || title.length > 100){
                alert('Title must be between 1 and 100 characters');
                return;
            }
            
            if(category.length < 1 || category.length > 20){
                alert('Category must be between 1 and 20 characters');
                return;
            }
            if(amount.length < 0){
                alert('Amount must be greater than 0');
                return;
            }
            if(description.length < 1 || description.length > 20){
                alert('Description must be between 1 and 20 characters');
                return;
            }
            alert('Error adding product');
            return;
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white-500 text-black text-left p-4 rounded-md shadow-md">
                <header className="text-2xl font-bold text-center text-black mb-4">Add Expensive
                    <p className="text-sm text-gray-500">Add a new expense to your tracker</p>
                </header>

<div className="flex flex-col gap-4 rounded-2xl border border-slate-200 text-black p-6 shadow-sm">
<input
  type="text"
  placeholder="Product title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className='border border-gray-300 rounded-md p-2'
/>

<input
  type="number"
  placeholder="Amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  className='border border-gray-300 rounded-md p-2'
/>
<input
  type="text"
  placeholder="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className='border border-gray-300 rounded-md p-2'
/>

<input
  placeholder="Description"
  type="text"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className='border border-gray-300 rounded-md p-2'
/>
<button type='submit' className="rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700">Add Product</button>
</div>
        </form>
        </div>
    )
}
export default AddExpensive;