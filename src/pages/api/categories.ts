import type { NextApiRequest, NextApiResponse } from 'next';
import { predefinedCategories } from '@/data/categories';

let categories = [...predefinedCategories];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(categories);
    } else if (req.method === 'POST') {
        const { name } = req.body;
        if (!name || categories.includes(name)) {
            return res.status(400).json({ error: 'Invalid or duplicate category' });
        }
        categories.push(name);
        res.status(201).json(categories);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}