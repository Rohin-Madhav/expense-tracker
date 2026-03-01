import { createContext, useContext, useState, useMemo } from 'react';
import { MOCK_TRANSACTIONS, formatCurrency } from '../data/mockData';
import { format } from 'date-fns';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    const [darkMode, setDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return next;
        });
    };

    const addTransaction = (transaction) => {
        setTransactions(prev => [
            { ...transaction, id: Date.now() },
            ...prev,
        ]);
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const summary = useMemo(() => {
        const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const balance = totalIncome - totalExpenses;
        const savings = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;
        return { totalIncome, totalExpenses, balance, savings };
    }, [transactions]);

    const categoryBreakdown = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense');
        const map = {};
        expenses.forEach(t => {
            map[t.category] = (map[t.category] || 0) + t.amount;
        });
        return Object.entries(map).map(([cat, value]) => ({ category: cat, value }));
    }, [transactions]);

    const value = {
        transactions,
        darkMode,
        currentPage,
        sidebarOpen,
        summary,
        categoryBreakdown,
        toggleDarkMode,
        addTransaction,
        deleteTransaction,
        setCurrentPage,
        setSidebarOpen,
        formatCurrency,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
};
