import React from 'react';

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
}

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        <span>{transaction.date} - {transaction.description}: ${transaction.amount}</span>
                        <button onClick={() => onEdit(transaction.id)}>Edit</button>
                        <button onClick={() => onDelete(transaction.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;