import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api'; // Update the path to match the correct location of your API utility
import Chart from '../components/Chart';
import TransactionList from '../components/TransactionList';
import { Transaction } from '../types';

const Dashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const data: Transaction[] = await fetchTransactions();
                setTransactions(data);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
                setError('Failed to fetch transactions. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getTransactions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    // Calculate total expenses
    const totalExpenses = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    // Calculate category breakdown
    const categoryBreakdown: { [key: string]: number } = {};
    transactions.forEach((transaction) => {
        if (transaction.category) {
            categoryBreakdown[transaction.category] = (categoryBreakdown[transaction.category] || 0) + transaction.amount;
        }
    });

    // Transform category breakdown into chart data
    const chartData = Object.entries(categoryBreakdown).map(([category, amount]) => ({
        category,
        amount,
    }));

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
                <Chart data={chartData.map(({ category, amount }) => ({ month: category, expenses: amount }))} />
                <TransactionList 
                    transactions={transactions} 
                    onEdit={(id) => console.log(`Edit transaction with id: ${id}`)} 
                    onDelete={(id) => console.log(`Delete transaction with id: ${id}`)} 
                />
            </div>
        </div>
    );
};

export default Dashboard;