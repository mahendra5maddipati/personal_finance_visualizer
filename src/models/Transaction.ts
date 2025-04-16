import mongoose, { Schema, model, models } from 'mongoose';

export interface ITransaction extends mongoose.Document {
    amount: number;
    date: Date;
    description: string;
    category?: string; // Optional field for future stages
}

const TransactionSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: 'Uncategorized', // Default value for category
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Transaction = models.Transaction || model('Transaction', TransactionSchema);

export default Transaction;