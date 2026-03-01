import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import ChartContainer from '../ui/ChartContainer';
import { MONTHLY_DATA, getCategoryById } from '../../data/mockData';

const CustomTooltipBar = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft-lg p-3 border border-slate-100 dark:border-slate-700 text-xs">
                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">{label}</p>
                {payload.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-slate-500 dark:text-slate-400 capitalize">{entry.name}:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">${entry.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const CustomTooltipPie = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const cat = getCategoryById(payload[0].name);
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft-lg p-3 border border-slate-100 dark:border-slate-700 text-xs">
                <p className="font-semibold text-slate-700 dark:text-slate-300">{cat.icon} {cat.label}</p>
                <p className="text-primary-600 dark:text-primary-400 font-bold">${payload[0].value.toLocaleString()}</p>
                <p className="text-slate-400">{payload[0].payload.percent}%</p>
            </div>
        );
    }
    return null;
};

export default function Charts() {
    const { categoryBreakdown } = useApp();

    const total = categoryBreakdown.reduce((s, c) => s + c.value, 0);
    const pieData = categoryBreakdown.map(c => ({
        ...c,
        name: c.category,
        percent: total > 0 ? ((c.value / total) * 100).toFixed(1) : 0,
        fill: getCategoryById(c.category).color,
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Bar Chart */}
            <ChartContainer
                title="Income vs Expenses"
                subtitle="Monthly comparison overview"
                className="lg:col-span-3"
            >
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={MONTHLY_DATA} barCategoryGap="30%" barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip content={<CustomTooltipBar />} cursor={{ fill: 'rgba(148,163,184,0.08)', radius: 6 }} />
                        <Bar dataKey="income" name="income" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="expenses" name="expenses" fill="#ec4899" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-4 mt-3 justify-center">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <div className="w-3 h-3 rounded-sm bg-primary-500" />
                        Income
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <div className="w-3 h-3 rounded-sm bg-pink-500" />
                        Expenses
                    </div>
                </div>
            </ChartContainer>

            {/* Pie Chart */}
            <ChartContainer
                title="Category Breakdown"
                subtitle="Expenses by category"
                className="lg:col-span-2"
            >
                {pieData.length > 0 ? (
                    <>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={index} fill={entry.fill} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltipPie />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-3 space-y-2">
                            {pieData.slice(0, 5).map((item) => {
                                const cat = getCategoryById(item.category);
                                return (
                                    <div key={item.category} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                                            <span className="text-slate-600 dark:text-slate-400">{cat.label}</span>
                                        </div>
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">{item.percent}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-48 text-slate-400 text-sm">No expense data</div>
                )}
            </ChartContainer>
        </div>
    );
}
