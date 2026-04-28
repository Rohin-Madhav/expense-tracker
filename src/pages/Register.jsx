import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Eye, EyeOff, UserPlus } from 'lucide-react';

export default function Register() {
    const { register, authError, authLoading, setAuthPage } = useApp();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [showPw, setShowPw] = useState(false);

    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(form);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50/30 to-accent-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <TrendingUp size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">SpendWise</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Finance Tracker</p>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Create account</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Start tracking your expenses today</p>

                    {authError && (
                        <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-700 dark:text-red-400 text-sm">
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="reg-name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="input-field w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="reg-email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                                className="input-field w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    name="password"
                                    id="reg-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="input-field w-full pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            id="register-submit"
                            type="submit"
                            disabled={authLoading}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            {authLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <UserPlus size={16} />
                            )}
                            {authLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                        <button
                            id="go-login"
                            onClick={() => setAuthPage('login')}
                            className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
