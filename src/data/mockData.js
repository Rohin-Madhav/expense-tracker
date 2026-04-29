// ─── Category definitions (static, no mock transactions) ─────────────────────

export const CATEGORIES = [
  { id: 'Food',          label: 'Food & Dining',     color: '#f59e0b', icon: '🍔' },
  { id: 'Rent',          label: 'Rent & Housing',    color: '#6366f1', icon: '🏠' },
  { id: 'Travel',        label: 'Travel',            color: '#10b981', icon: '✈️' },
  { id: 'Shopping',      label: 'Shopping',          color: '#ec4899', icon: '🛍️' },
  { id: 'Bills',         label: 'Bills & Utilities', color: '#ef4444', icon: '⚡' },
  { id: 'Entertainment', label: 'Entertainment',     color: '#8b5cf6', icon: '🎬' },
  { id: 'Health',        label: 'Health',            color: '#06b6d4', icon: '💊' },
  { id: 'Salary',        label: 'Salary',            color: '#22c55e', icon: '💼' },
  { id: 'Freelance',     label: 'Freelance',         color: '#3b82f6', icon: '💻' },
  { id: 'Investment',    label: 'Investment',        color: '#f97316', icon: '📈' },
  { id: 'Others',        label: 'Others',            color: '#94a3b8', icon: '📦' },
];

export const INCOME_CATEGORIES  = ['Salary', 'Freelance', 'Investment'];
export const EXPENSE_CATEGORIES = ['Food', 'Rent', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Others'];

export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
