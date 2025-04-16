import React, { useEffect, useState } from 'react';

const TransactionList: React.FC = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/transactions');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction._id}>
                        {transaction.date} - {transaction.description}: ${transaction.amount} ({transaction.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;