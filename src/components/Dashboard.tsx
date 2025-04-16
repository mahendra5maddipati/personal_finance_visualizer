import React from 'react';
import CategoryPieChart from './CategoryPieChart';
import TransactionList from './TransactionList';

type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
};

const Dashboard: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

    const categoryData: Record<string, number> = transactions.reduce((acc: Record<string, number>, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as Record<string, number>);

    const pieChartData = Object.entries(categoryData).map(([category, value]) => ({
        category,
        value,
    }));

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
                <h3>Category Breakdown:</h3>
                <ul>
                    {Object.entries(categoryData).map(([category, value]) => (
                        <li key={category}>
                            {category}: ${(value).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <h3>Most Recent Transactions:</h3>
                <ul>
                    {transactions.slice(-5).map((t) => (
                        <li key={t.id}>
                            {t.date} - {t.description}: ${t.amount}
                        </li>
                    ))}
                </ul>
            </div>
            <CategoryPieChart data={pieChartData} />
            <TransactionList transactions={transactions} onEdit={() => {}} onDelete={() => {}} />
        </div>
    );
};

export default Dashboard;