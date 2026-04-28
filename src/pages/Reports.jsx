import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ChartContainer from '../components/ui/ChartContainer';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import { CATEGORIES, EXPENSE_CATEGORIES, getCategoryById } from '../data/mockData';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { format, parseISO, getMonth, startOfMonth } from 'date-fns';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const CATEGORY_FILTER = [{ id: 'all', label: 'All Categories' }, ...CATEGORIES.filter(c => EXPENSE_CATEGORIES.includes(c.id))];

export default function Reports() {
    const { transactions, formatCurrency } = useApp();
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Build monthly area chart data from real transactions
    const monthlyData = useMemo(() => {
        const map = {};
        transactions.forEach((t) => {
            const key = format(startOfMonth(parseISO(t.date)), 'yyyy-MM');
            if (!map[key]) map[key] = { month: format(parseISO(t.date), 'MMM'), income: 0, expenses: 0 };
            if (t.type === 'income')  map[key].income   += t.amount;
            if (t.type === 'expense') map[key].expenses += t.amount;
        });
        return Object.entries(map)
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(-8)
            .map(([, v]) => v);
    }, [transactions]);

    const filtered = useMemo(() => {
        return transactions.filter(t => {
            const monthMatch = selectedMonth === 'all' || getMonth(parseISO(t.date)) === Number(selectedMonth);
            const catMatch = selectedCategory === 'all' || t.category === selectedCategory;
            return monthMatch && catMatch;
        });
    }, [transactions, selectedMonth, selectedCategory]);

    const totalIncome = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    const catBreakdown = useMemo(() => {
        const map = {};
        filtered.filter(t => t.type === 'expense').forEach(t => {
            map[t.category] = (map[t.category] || 0) + t.amount;
        });
        return Object.entries(map).map(([cat, value]) => ({
            name: getCategoryById(cat).label,
            value,
            icon: getCategoryById(cat).icon,
            color: getCategoryById(cat).color,
        }));
    }, [filtered]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length)
            return (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft-lg p-3 border border-slate-100 dark:border-slate-700 text-xs">
                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">{label}</p>
                    {payload.map(e => (
                        <div key={e.name} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                            <span className="text-slate-500">{e.name}:</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">${e.value?.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            );
        return null;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
                <div className="w-44">
                    <Select id="report-month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                        <option value="all">All Months</option>
                        {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                    </Select>
                </div>
                <div className="w-52">
                    <Select id="report-category" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        {CATEGORY_FILTER.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </Select>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                    Showing {filtered.length} transactions
                </span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Income', value: formatCurrency(totalIncome), color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                    { label: 'Total Expenses', value: formatCurrency(totalExpense), color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
                    { label: 'Net Savings', value: formatCurrency(totalIncome - totalExpense), color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-500/10' },
                ].map(item => (
                    <Card key={item.label} className={`${item.bg} border-0`}>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{item.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${item.color}`}>{item.value}</p>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Area Chart */}
                <ChartContainer title="Income vs Expenses Trend" subtitle="Monthly overview" className="lg:col-span-3">
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={monthlyData}>
                            <defs>
                                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="income" name="Income" stroke="#6366f1" strokeWidth={2} fill="url(#incomeGrad)" />
                            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ec4899" strokeWidth={2} fill="url(#expGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>

                {/* Category Breakdown */}
                <ChartContainer title="Category Breakdown" subtitle="Filtered expenses" className="lg:col-span-2">
                    {catBreakdown.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={180}>
                                <PieChart>
                                    <Pie data={catBreakdown} innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                                        {catBreakdown.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="space-y-2 mt-2">
                                {catBreakdown.slice(0, 4).map(item => (
                                    <div key={item.name} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="text-slate-600 dark:text-slate-400">{item.icon} {item.name}</span>
                                        </div>
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(item.value)}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-48 text-slate-400 text-sm">No expense data</div>
                    )}
                </ChartContainer>
            </div>

            {/* Top Spending Table */}
            <Card>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">Top Spending Categories</h3>
                {catBreakdown.length === 0 ? (
                    <p className="text-sm text-slate-400">No data available</p>
                ) : (
                    <div className="space-y-3">
                        {catBreakdown.sort((a, b) => b.value - a.value).map((item, i) => {
                            const pct = totalExpense > 0 ? (item.value / totalExpense) * 100 : 0;
                            return (
                                <div key={item.name}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.icon} {item.name}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-slate-400">{pct.toFixed(1)}%</span>
                                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatCurrency(item.value)}</span>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${pct}%`, backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>
        </div>
    );
}
