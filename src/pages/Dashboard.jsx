import SummaryCards from '../components/dashboard/SummaryCards';
import Charts from '../components/dashboard/Charts';
import AddTransaction from '../components/dashboard/AddTransaction';
import TransactionsTable from '../components/dashboard/TransactionsTable';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
    const { transactions } = useApp();
    const recent = transactions.slice(0, 5);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Summary Cards */}
            <SummaryCards />

            {/* Charts */}
            <Charts />

            {/* Add + Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                    <AddTransaction />
                </div>
                <div className="lg:col-span-3">
                    <TransactionsTable transactions={recent} showPagination={false} />
                </div>
            </div>
        </div>
    );
}
