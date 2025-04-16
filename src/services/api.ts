import axios from 'axios';
import { Transaction } from '../types';

const API_BASE_URL = '/api/transactions';

export const fetchTransactions = async (): Promise<Transaction[]> => {
    try {
        const response = await axios.get<Transaction[]>(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error('Failed to fetch transactions');
    }
};

export const createTransaction = async (transaction: Partial<Transaction>): Promise<Transaction> => {
    try {
        const response = await axios.post<Transaction>(API_BASE_URL, transaction);
        return response.data;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw new Error('Failed to create transaction');
    }
};

export const updateTransaction = async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    try {
        const response = await axios.put<Transaction>(`${API_BASE_URL}/${id}`, transaction);
        return response.data;
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw new Error('Failed to update transaction');
    }
};

export const deleteTransaction = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw new Error('Failed to delete transaction');
    }
};