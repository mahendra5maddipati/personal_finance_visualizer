import React, { useState } from 'react';
import { validateTransaction } from '../utils/validation';
import { Transaction } from '../types'; // Assuming you have a Transaction type defined
import { predefinedCategories } from '../data/categories';

interface FormProps {
    onSubmit: (transaction: Partial<Transaction>) => void;
    initialTransaction?: Partial<Transaction>;
}

const Form: React.FC<FormProps> = ({ onSubmit, initialTransaction }) => {
    const [amount, setAmount] = useState(initialTransaction?.amount || '');
    const [date, setDate] = useState(initialTransaction?.date || '');
    const [description, setDescription] = useState(initialTransaction?.description || '');
    const [category, setCategory] = useState(initialTransaction?.category || 'Uncategorized');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { isValid, errors } = validateTransaction(amount.toString(), date, description);
        if (!isValid) {
            setError(Object.values(errors).join(', '));
            return;
        }
        onSubmit({ amount: Number(amount), date, description, category });
        setAmount('');
        setDate('');
        setDescription('');
        setCategory('Uncategorized');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {predefinedCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;