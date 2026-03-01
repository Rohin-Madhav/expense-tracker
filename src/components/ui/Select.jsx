export default function Select({ label, id, error, children, className = '', ...props }) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={id} className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {label}
                </label>
            )}
            <select
                id={id}
                className={`input-field ${error ? 'border-red-400 focus:border-red-500' : ''} ${className}`}
                {...props}
            >
                {children}
            </select>
            {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
        </div>
    );
}
