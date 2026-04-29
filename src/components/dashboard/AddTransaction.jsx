import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { CATEGORIES, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/mockData';
import { PlusCircle } from 'lucide-react';
import { format } from 'date-fns';

const INITIAL_FORM = {
    title: '',
    amount: '',
    category: 'Food',
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'expense',
};

export default function AddTransaction() {
    const { addTransaction } = useApp();
    const [form, setForm]       = useState(INITIAL_FORM);
    const [errors, setErrors]   = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const categories = form.type === 'income'
        ? CATEGORIES.filter((c) => INCOME_CATEGORIES.includes(c.id))
        : CATEGORIES.filter((c) => EXPENSE_CATEGORIES.includes(c.id));

    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = 'Title is required';
        if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
            errs.amount = 'Enter a valid amount';
        if (!form.date) errs.date = 'Date is required';
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const next = { ...prev, [name]: value };
            if (name === 'type') {
                next.category = value === 'income' ? 'Salary' : 'Food';
            }
            return next;
        });
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setLoading(true);
        setApiError('');
        try {
            await addTransaction({ ...form, amount: Number(form.amount) });
            setForm(INITIAL_FORM);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setApiError(err.response?.data?.message || 'Failed to add transaction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                    <PlusCircle size={16} className="text-white" />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Add Transaction</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Record a new income or expense</p>
                </div>
            </div>

            {success && (
                <div className="mb-4 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-700 dark:text-emerald-400 text-sm font-medium animate-slide-up flex items-center gap-2">
                    <span>✓</span> Transaction added successfully!
                </div>
            )}

            {apiError && (
                <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-700 dark:text-red-400 text-sm font-medium">
                    {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type Toggle */}
                <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">Type</p>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900/60 rounded-xl">
                        {['expense', 'income'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => handleChange({ target: { name: 'type', value: t } })}
                                className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 capitalize
                  ${form.type === t
                                        ? t === 'income'
                                            ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                            : 'bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                            >
                                {t === 'income' ? '↑ Income' : '↓ Expense'}
                            </button>
                        ))}
                    </div>
                </div>

                <Input
                    label="Title"
                    id="txn-title"
                    name="title"
                    placeholder="e.g. Monthly Rent"
                    value={form.title}
                    onChange={handleChange}
                    error={errors.title}
                />

                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="Amount ($)"
                        id="txn-amount"
                        name="amount"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={form.amount}
                        onChange={handleChange}
                        error={errors.amount}
                    />
                    <Input
                        label="Date"
                        id="txn-date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        error={errors.date}
                    />
                </div>

                <Select
                    label="Category"
                    id="txn-category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
                    ))}
                </Select>

                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    <span className="flex items-center justify-center gap-2">
                        {loading
                            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            : <PlusCircle size={16} />
                        }
                        {loading ? 'Saving...' : 'Add Transaction'}
                    </span>
                </Button>
            </form>
        </Card>
    );
}
