import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { formatCurrency } from '../data/mockData';
import * as api from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    // ─── Auth state ───────────────────────────────────────────────────────────
    const [user, setUser]             = useState(() => {
        try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
    });
    const [token, setToken]           = useState(() => localStorage.getItem('token') || null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError]   = useState('');
    const [authPage, setAuthPage]     = useState('login'); // 'login' | 'register'

    // ─── App state ────────────────────────────────────────────────────────────
    const [transactions, setTransactions] = useState([]);
    const [txnLoading, setTxnLoading]     = useState(false);
    const [txnError, setTxnError]         = useState('');
    const [darkMode, setDarkMode]         = useState(false);
    const [currentPage, setCurrentPage]   = useState('dashboard');
    const [sidebarOpen, setSidebarOpen]   = useState(false);

    // ─── Dark mode ────────────────────────────────────────────────────────────
    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle('dark', next);
            return next;
        });
    };

    // ─── Fetch transactions from API ─────────────────────────────────────────
    const fetchTransactions = useCallback(async () => {
        if (!token) return;
        setTxnLoading(true);
        setTxnError('');
        try {
            const { data } = await api.getTransactions();
            // Normalise: backend returns _id, frontend uses id
            setTransactions(data.map((t) => ({ ...t, id: t._id })));
        } catch (err) {
            setTxnError(err.response?.data?.message || 'Failed to load transactions');
        } finally {
            setTxnLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) fetchTransactions();
        else setTransactions([]);
    }, [token, fetchTransactions]);

    // ─── Auth actions ─────────────────────────────────────────────────────────
    const login = async ({ email, password }) => {
        setAuthLoading(true);
        setAuthError('');
        try {
            const { data } = await api.loginUser({ email, password });
            const userData = data.user;
            const jwtToken = data.token;
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('user', JSON.stringify(userData));
            setToken(jwtToken);
            setUser(userData);
        } catch (err) {
            setAuthError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setAuthLoading(false);
        }
    };

    const register = async ({ name, email, password }) => {
        setAuthLoading(true);
        setAuthError('');
        try {
            const { data } = await api.registerUser({ name, email, password });
            const userData = data.data;
            const jwtToken = data.token;
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('user', JSON.stringify(userData));
            setToken(jwtToken);
            setUser(userData);
        } catch (err) {
            setAuthError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setTransactions([]);
        setCurrentPage('dashboard');
    };

    // ─── Transaction actions ──────────────────────────────────────────────────
    const addTransaction = async (txnData) => {
        const { data } = await api.addTransaction(txnData);
        const newTxn = { ...data.data, id: data.data._id };
        setTransactions((prev) => [newTxn, ...prev]);
        return newTxn;
    };

    const deleteTransaction = async (id) => {
        await api.deleteTransaction(id);
        setTransactions((prev) => prev.filter((t) => t.id !== id && t._id !== id));
    };

    const updateTransaction = async (id, updates) => {
        const { data } = await api.updateTransaction(id, updates);
        const updated = { ...data, id: data._id };
        setTransactions((prev) => prev.map((t) => (t.id === id ? updated : t)));
        return updated;
    };

    // ─── Derived data ─────────────────────────────────────────────────────────
    const summary = useMemo(() => {
        const totalIncome   = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        const balance  = totalIncome - totalExpenses;
        const savings  = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;
        return { totalIncome, totalExpenses, balance, savings };
    }, [transactions]);

    const categoryBreakdown = useMemo(() => {
        const map = {};
        transactions.filter((t) => t.type === 'expense').forEach((t) => {
            map[t.category] = (map[t.category] || 0) + t.amount;
        });
        return Object.entries(map).map(([cat, value]) => ({ category: cat, value }));
    }, [transactions]);

    const value = {
        // auth
        user, token, authLoading, authError, authPage,
        login, register, logout, setAuthPage,
        // app
        transactions, txnLoading, txnError,
        darkMode, currentPage, sidebarOpen,
        summary, categoryBreakdown,
        // actions
        toggleDarkMode, addTransaction, deleteTransaction, updateTransaction,
        fetchTransactions, setCurrentPage, setSidebarOpen,
        formatCurrency,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
};
