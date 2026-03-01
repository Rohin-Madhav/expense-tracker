import { useApp } from '../../context/AppContext';
import {
    LayoutDashboard,
    ArrowLeftRight,
    BarChart3,
    Settings,
    TrendingUp,
    X,
} from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
    const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen } = useApp();

    const handleNav = (id) => {
        setCurrentPage(id);
        setSidebarOpen(false);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col
          bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-md">
                            <TrendingUp size={16} className="text-white" />
                        </div>
                        <div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">SpendWise</span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-none">Finance</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <p className="px-4 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-widest">Menu</p>
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => handleNav(id)}
                            className={`nav-link w-full ${currentPage === id ? 'active' : ''}`}
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                            {currentPage === id && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* User Profile Card */}
                <div className="px-3 pb-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            JD
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">John Doe</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">john@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
