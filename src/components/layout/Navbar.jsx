import { useApp } from '../../context/AppContext';
import { Sun, Moon, Bell, Menu, Search } from 'lucide-react';

const pageTitles = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    reports: 'Reports',
    settings: 'Settings',
};

const pageSubtitles = {
    dashboard: "Here's your financial overview",
    transactions: 'View and manage all transactions',
    reports: 'Analyze your spending patterns',
    settings: 'Manage your preferences',
};

export default function Navbar() {
    const { darkMode, toggleDarkMode, currentPage, setSidebarOpen } = useApp();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button
                    id="sidebar-toggle"
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                    aria-label="Open sidebar"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden sm:block">
                    <h1 className="text-base font-bold text-slate-900 dark:text-white">{pageTitles[currentPage]}</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{pageSubtitles[currentPage]}</p>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-400 w-48">
                    <Search size={14} />
                    <span>Search...</span>
                </div>

                {/* Dark Mode Toggle */}
                <button
                    id="dark-mode-toggle"
                    onClick={toggleDarkMode}
                    className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications */}
                <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200 relative">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Avatar */}
                <div className="flex items-center gap-2 ml-1 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                        JD
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-none">John Doe</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{today}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
