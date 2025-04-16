export const validateTransaction = (amount: string, date: string, description: string) => {
    const errors: { amount?: string; date?: string; description?: string } = {};

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        errors.amount = "Amount must be a positive number.";
    }

    if (!date) {
        errors.date = "Date is required.";
    }

    if (!description) {
        errors.description = "Description is required.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};