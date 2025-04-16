export interface Transaction {
    id: string;
    amount: number;
    date: string; // ISO format date
    description: string;
    category?: string; // Optional category for future use
}

export interface Category {
    name: string;
    budget: number; // Monthly budget for the category
}

export interface MonthlySummary {
    totalExpenses: number;
    categoryBreakdown: Record<string, number>; // Key: category name, Value: total expenses for that category
    recentTransactions: Transaction[];
}