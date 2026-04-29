import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Card from '../ui/Card';
import { getCategoryById } from '../../data/mockData';
import { Trash2, Edit2, ArrowUpRight, ArrowDownLeft, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import UpdateTransactionModal from './UpdateTransactionModal';

const PAGE_SIZE = 8;

export default function TransactionsTable({ transactions: propTransactions, showPagination = true }) {
    const { transactions: allTransactions, deleteTransaction, formatCurrency, txnLoading } = useApp();
    const data = propTransactions ?? allTransactions;
    const [page, setPage] = useState(1);
    const [deletingId, setDeletingId] = useState(null);
    const [editingTxn, setEditingTxn] = useState(null);

    const totalPages = Math.ceil(data.length / PAGE_SIZE);
    const paginated = showPagination
        ? data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
        : data.slice(0, PAGE_SIZE);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deleteTransaction(id);
        } finally {
            setDeletingId(null);
        }
    };

    if (txnLoading && data.length === 0) {
        return (
            <Card className="overflow-hidden">
                <div className="flex items-center justify-center py-16 text-slate-400">
                    <Loader2 size={24} className="animate-spin mr-2" />
                    <span className="text-sm">Loading transactions...</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Recent Transactions</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{data.length} transactions total</p>
                </div>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                    <p className="text-4xl mb-3">📭</p>
                    <p className="text-sm font-medium">No transactions found</p>
                    <p className="text-xs mt-1">Add your first transaction above</p>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto -mx-6">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-700/60">
                                    <th className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-left px-6 py-3">Transaction</th>
                                    <th className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-left px-4 py-3">Category</th>
                                    <th className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-left px-4 py-3">Date</th>
                                    <th className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-right px-4 py-3">Amount</th>
                                    <th className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center px-4 py-3">Type</th>
                                    <th className="px-6 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/40">
                                {paginated.map((txn) => {
                                    const cat = getCategoryById(txn.category);
                                    const id = txn._id || txn.id;
                                    return (
                                        <tr
                                            key={id}
                                            className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors duration-150 group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                                                        style={{ backgroundColor: `${cat.color}18` }}
                                                    >
                                                        {cat.icon}
                                                    </div>
                                                    <span className="font-medium text-slate-800 dark:text-slate-200">{txn.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-lg">
                                                    {cat.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-xs text-slate-500 dark:text-slate-400">
                                                {format(parseISO(txn.date), 'MMM d, yyyy')}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <span className={`font-bold text-sm ${txn.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                                                    {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                {txn.type === 'income' ? (
                                                    <span className="badge-income inline-flex items-center gap-1">
                                                        <ArrowUpRight size={11} /> Income
                                                    </span>
                                                ) : (
                                                    <span className="badge-expense inline-flex items-center gap-1">
                                                        <ArrowDownLeft size={11} /> Expense
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                                    <button
                                                        onClick={() => setEditingTxn(txn)}
                                                        className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                                        aria-label="Edit transaction"
                                                    >
                                                        <Edit2 size={15} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(id)}
                                                        disabled={deletingId === id}
                                                        className="btn-danger disabled:opacity-60"
                                                        aria-label="Delete transaction"
                                                    >
                                                        {deletingId === id
                                                            ? <Loader2 size={15} className="animate-spin" />
                                                            : <Trash2 size={15} />
                                                        }
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {paginated.map((txn) => {
                            const cat = getCategoryById(txn.category);
                            const id = txn._id || txn.id;
                            return (
                                <div key={id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                                        style={{ backgroundColor: `${cat.color}18` }}
                                    >
                                        {cat.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{txn.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{cat.label} · {format(parseISO(txn.date), 'MMM d')}</p>
                                    </div>
                                    <span className={`text-sm font-bold ${txn.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                                        {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                                    </span>
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={() => setEditingTxn(txn)}
                                            className="p-1.5 text-slate-400 hover:text-blue-500 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
                                            aria-label="Edit transaction"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(id)}
                                            disabled={deletingId === id}
                                            className="btn-danger p-1.5 disabled:opacity-60"
                                        >
                                            {deletingId === id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {showPagination && totalPages > 1 && (
                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                Page {page} of {totalPages}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400 transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${p === page
                                            ? 'bg-primary-600 text-white'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400 transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
            {editingTxn && (
                <UpdateTransactionModal 
                    transaction={editingTxn} 
                    onClose={() => setEditingTxn(null)} 
                />
            )}
        </Card>
    );
}
