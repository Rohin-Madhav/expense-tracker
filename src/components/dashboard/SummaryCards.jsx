import { useApp } from '../../context/AppContext';
import Card from '../ui/Card';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

function SummaryCard({ title, value, change, icon: Icon, gradient, iconBg, trend }) {
    return (
        <Card hover className="relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className={`absolute inset-0 opacity-5 ${gradient} rounded-2xl`} />
            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center shadow-sm`}>
                        <Icon size={20} className="text-white" />
                    </div>
                    {change !== undefined && (
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${trend === 'up' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'}`}>
                            {trend === 'up' ? '↑' : '↓'} {change}%
                        </span>
                    )}
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{title}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
            </div>
        </Card>
    );
}

export default function SummaryCards() {
    const { summary, formatCurrency } = useApp();

    const cards = [
        {
            title: 'Total Balance',
            value: formatCurrency(summary.balance),
            change: 12.5,
            trend: 'up',
            icon: Wallet,
            gradient: 'bg-gradient-to-br from-primary-600 to-primary-400',
            iconBg: 'bg-gradient-to-br from-primary-600 to-primary-400',
        },
        {
            title: 'Total Income',
            value: formatCurrency(summary.totalIncome),
            change: 8.2,
            trend: 'up',
            icon: TrendingUp,
            gradient: 'bg-gradient-to-br from-emerald-500 to-teal-400',
            iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-400',
        },
        {
            title: 'Total Expenses',
            value: formatCurrency(summary.totalExpenses),
            change: 3.1,
            trend: 'down',
            icon: TrendingDown,
            gradient: 'bg-gradient-to-br from-red-500 to-orange-400',
            iconBg: 'bg-gradient-to-br from-red-500 to-orange-400',
        },
        {
            title: 'Monthly Savings',
            value: `${summary.savings}%`,
            change: 5.4,
            trend: 'up',
            icon: PiggyBank,
            gradient: 'bg-gradient-to-br from-accent-600 to-pink-400',
            iconBg: 'bg-gradient-to-br from-accent-600 to-pink-400',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {cards.map((card) => (
                <SummaryCard key={card.title} {...card} />
            ))}
        </div>
    );
}
