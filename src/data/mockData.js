import { subDays, subMonths, format } from 'date-fns';

export const CATEGORIES = [
  { id: 'food', label: 'Food & Dining', color: '#f59e0b', icon: '🍔' },
  { id: 'rent', label: 'Rent & Housing', color: '#6366f1', icon: '🏠' },
  { id: 'travel', label: 'Travel', color: '#10b981', icon: '✈️' },
  { id: 'shopping', label: 'Shopping', color: '#ec4899', icon: '🛍️' },
  { id: 'bills', label: 'Bills & Utilities', color: '#ef4444', icon: '⚡' },
  { id: 'entertainment', label: 'Entertainment', color: '#8b5cf6', icon: '🎬' },
  { id: 'health', label: 'Health', color: '#06b6d4', icon: '💊' },
  { id: 'salary', label: 'Salary', color: '#22c55e', icon: '💼' },
  { id: 'freelance', label: 'Freelance', color: '#3b82f6', icon: '💻' },
  { id: 'investment', label: 'Investment', color: '#f97316', icon: '📈' },
  { id: 'others', label: 'Others', color: '#94a3b8', icon: '📦' },
];

export const INCOME_CATEGORIES = ['salary', 'freelance', 'investment'];
export const EXPENSE_CATEGORIES = ['food', 'rent', 'travel', 'shopping', 'bills', 'entertainment', 'health', 'others'];

const now = new Date();

export const MOCK_TRANSACTIONS = [
  { id: 1, title: 'Monthly Salary', amount: 5000, category: 'salary', date: format(subDays(now, 1), 'yyyy-MM-dd'), type: 'income' },
  { id: 2, title: 'Apartment Rent', amount: 1200, category: 'rent', date: format(subDays(now, 2), 'yyyy-MM-dd'), type: 'expense' },
  { id: 3, title: 'Grocery Shopping', amount: 145, category: 'food', date: format(subDays(now, 3), 'yyyy-MM-dd'), type: 'expense' },
  { id: 4, title: 'Flight to NYC', amount: 320, category: 'travel', date: format(subDays(now, 4), 'yyyy-MM-dd'), type: 'expense' },
  { id: 5, title: 'Freelance Project', amount: 1500, category: 'freelance', date: format(subDays(now, 5), 'yyyy-MM-dd'), type: 'income' },
  { id: 6, title: 'Netflix & Spotify', amount: 28, category: 'entertainment', date: format(subDays(now, 6), 'yyyy-MM-dd'), type: 'expense' },
  { id: 7, title: 'Electricity Bill', amount: 95, category: 'bills', date: format(subDays(now, 7), 'yyyy-MM-dd'), type: 'expense' },
  { id: 8, title: 'Amazon Shopping', amount: 215, category: 'shopping', date: format(subDays(now, 8), 'yyyy-MM-dd'), type: 'expense' },
  { id: 9, title: 'Doctor Visit', amount: 85, category: 'health', date: format(subDays(now, 9), 'yyyy-MM-dd'), type: 'expense' },
  { id: 10, title: 'Dinner at Restaurant', amount: 75, category: 'food', date: format(subDays(now, 10), 'yyyy-MM-dd'), type: 'expense' },
  { id: 11, title: 'Stock Dividends', amount: 350, category: 'investment', date: format(subDays(now, 11), 'yyyy-MM-dd'), type: 'income' },
  { id: 12, title: 'Online Course', amount: 49, category: 'others', date: format(subDays(now, 12), 'yyyy-MM-dd'), type: 'expense' },
  { id: 13, title: 'Weekend Trip', amount: 480, category: 'travel', date: format(subDays(now, 14), 'yyyy-MM-dd'), type: 'expense' },
  { id: 14, title: 'Coffee & Cafes', amount: 42, category: 'food', date: format(subDays(now, 15), 'yyyy-MM-dd'), type: 'expense' },
  { id: 15, title: 'Internet Bill', amount: 60, category: 'bills', date: format(subDays(now, 16), 'yyyy-MM-dd'), type: 'expense' },
  { id: 16, title: 'Bonus Payment', amount: 2000, category: 'salary', date: format(subDays(now, 20), 'yyyy-MM-dd'), type: 'income' },
  { id: 17, title: 'Gym Membership', amount: 55, category: 'health', date: format(subDays(now, 22), 'yyyy-MM-dd'), type: 'expense' },
  { id: 18, title: 'New Shoes', amount: 130, category: 'shopping', date: format(subDays(now, 25), 'yyyy-MM-dd'), type: 'expense' },
];

export const MONTHLY_DATA = [
  { month: 'Aug', income: 5800, expenses: 2800 },
  { month: 'Sep', income: 6200, expenses: 3100 },
  { month: 'Oct', income: 5500, expenses: 2600 },
  { month: 'Nov', income: 7000, expenses: 3500 },
  { month: 'Dec', income: 6800, expenses: 4200 },
  { month: 'Jan', income: 6500, expenses: 3300 },
  { month: 'Feb', income: 7200, expenses: 3850 },
  { month: 'Mar', income: 8850, expenses: 2879 },
];

export const getCategoryById = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
