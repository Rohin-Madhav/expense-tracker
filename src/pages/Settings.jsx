import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useApp } from '../context/AppContext';
import { Bell, Shield, Palette, Globe, User, CreditCard, ChevronRight } from 'lucide-react';

const sections = [
    { icon: User, label: 'Profile Settings', desc: 'Update personal info and account details' },
    { icon: Bell, label: 'Notifications', desc: 'Control alerts and email preferences' },
    { icon: Shield, label: 'Security', desc: 'Password, 2FA, and login activity' },
    { icon: Palette, label: 'Appearance', desc: 'Customize theme and display options' },
    { icon: Globe, label: 'Currency & Region', desc: 'Set your preferred currency and locale' },
    { icon: CreditCard, label: 'Billing', desc: 'Subscription and payment methods' },
];

export default function Settings() {
    const { darkMode, toggleDarkMode } = useApp();
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-2xl">
            {/* Profile */}
            <Card>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-5">Profile</h3>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
                        <button className="mt-1 text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline">Change avatar</button>
                    </div>
                </div>
                <div className="space-y-4">
                    <Input label="Full Name" id="settings-name" value={name} onChange={e => setName(e.target.value)} />
                    <Input label="Email Address" id="settings-email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                {saved && (
                    <div className="mt-4 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                        ✓ Changes saved successfully!
                    </div>
                )}
                <div className="mt-5 flex gap-3">
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                    <Button variant="secondary">Cancel</Button>
                </div>
            </Card>

            {/* Appearance */}
            <Card>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">Appearance</h3>
                <div className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Dark Mode</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Switch to dark theme</p>
                    </div>
                    <button
                        id="settings-dark-toggle"
                        onClick={toggleDarkMode}
                        className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800
              ${darkMode ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                    >
                        <span className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 m-0.5 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
            </Card>

            {/* Settings Links */}
            <Card className="p-0 overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {sections.map(({ icon: Icon, label, desc }) => (
                        <button key={label} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors text-left">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 flex-shrink-0">
                                <Icon size={17} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                            </div>
                            <ChevronRight size={16} className="text-slate-400" />
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    );
}
