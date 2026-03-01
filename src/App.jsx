import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function AppContent() {
    const { currentPage } = useApp();

    const pages = {
        dashboard: <Dashboard />,
        transactions: <Transactions />,
        reports: <Reports />,
        settings: <Settings />,
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <div className="max-w-7xl mx-auto">
                        {pages[currentPage]}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}
