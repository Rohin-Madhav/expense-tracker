import { useState } from 'react';
import { useApp } from '../context/AppContext';
import TransactionsTable from '../components/dashboard/TransactionsTable';
import Select from '../components/ui/Select';
import { CATEGORIES, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/mockData';
import { Search, Filter } from 'lucide-react';

const ALL_CATS = [{ id: 'all', label: 'All Categories' }, ...CATEGORIES];
const TYPES = [{ id: 'all', label: 'All Types' }, { id: 'income', label: 'Income' }, { id: 'expense', label: 'Expense' }];

export default function Transactions() {
    const { transactions } = useApp();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [type, setType] = useState('all');

    const filtered = transactions.filter(t => {
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'all' || t.category === category;
        const matchType = type === 'all' || t.type === type;
        return matchSearch && matchCat && matchType;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="input-field pl-10"
                    />
                </div>
                {/* Filters */}
                <div className="flex gap-2 flex-wrap">
                    <div className="w-44">
                        <Select id="filter-category" value={category} onChange={e => setCategory(e.target.value)}>
                            {ALL_CATS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </Select>
                    </div>
                    <div className="w-36">
                        <Select id="filter-type" value={type} onChange={e => setType(e.target.value)}>
                            {TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </Select>
                    </div>
                </div>
            </div>

            <TransactionsTable transactions={filtered} showPagination />
        </div>
    );
}
