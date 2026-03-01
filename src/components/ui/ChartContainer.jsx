export default function ChartContainer({ title, subtitle, children, className = '' }) {
    return (
        <div className={`card ${className}`}>
            <div className="mb-5">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
