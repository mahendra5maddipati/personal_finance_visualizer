import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITransaction extends Document {
    amount: number;
    date: Date;
    description: string;
    category?: string; // Optional field for future stages
}

const TransactionSchema: Schema = new Schema(
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

const Transaction: Model<ITransaction> =
    mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;