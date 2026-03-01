export default function Card({ children, className = '', hover = false }) {
    return (
        <div
            className={`card animate-fade-in ${hover ? 'hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
