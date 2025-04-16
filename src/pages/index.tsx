import React from 'react';
import Form from '../components/Form';
import TransactionList from '../components/TransactionList';
import Chart from '../components/Chart';

const Home = () => {
  return (
    <div>
      <h1>Personal Finance Visualizer</h1>
      <Form onSubmit={(transaction) => console.log('Submitted transaction:', transaction)} />
      <Chart data={[{ month: 'January', expenses: 500 }, { month: 'February', expenses: 300 }]} />
      <TransactionList 
        transactions={[{ id: '1', date: '2023-01-01', description: 'Groceries', amount: 50 }]} // Added date property
        onEdit={(id) => console.log('Edit transaction with id:', id)} 
        onDelete={(id) => console.log('Delete transaction with id:', id)} 
      />
    </div>
  );
};

export default Home;