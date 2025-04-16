import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import Transaction from '@/models/Transaction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const transactions = await Transaction.find({});
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch transactions' });
        }
    } else if (req.method === 'POST') {
        try {
            const transaction = await Transaction.create(req.body);
            res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create transaction' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}