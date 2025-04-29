import React, { useState } from 'react';

const BudgetTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [budget, setBudget] = useState('');

    const addExpense = () => {
        if (expenseName && expenseAmount) {
            setExpenses([...expenses, { name: expenseName, amount: parseFloat(expenseAmount) }]);
            setExpenseName('');
            setExpenseAmount('');
        }
    };

    const calculateTotalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const remainingBudget = () => {
        return budget - calculateTotalExpenses();
    };

    return (
        <div>
            <h1>Budget Tracker</h1>
            <div>
                <label>
                    Set Budget: 
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(parseFloat(e.target.value) || '')}
                    />
                </label>
            </div>
            <div>
                <h2>Add Expense</h2>
                <input
                    type="text"
                    placeholder="Expense Name"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Expense Amount"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                />
                <button onClick={addExpense}>Add Expense</button>
            </div>
            <div>
                <h2>Expenses</h2>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>
                            {expense.name}: ${expense.amount.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Summary</h2>
                <p>Total Expenses: ${calculateTotalExpenses().toFixed(2)}</p>
                <p>Remaining Budget: ${remainingBudget().toFixed(2)}</p>
            </div>
        </div>
    );
};

export default BudgetTracker;