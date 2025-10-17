import { cn } from '@/lib/utils';

export default function StatsCard({
    icon,
    value,
    label,
    description,
    className = '',
    iconClassName = '',
    valueClassName = '',
    labelClassName = '',
    descriptionClassName = '',
    hover = true,
    animation = 'bounce',
    animationDelay = '0s'
}) {
    return (
        <div className={cn(
            "bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 text-center",
            hover && "hover:scale-105 transition-transform duration-300",
            className
        )}>
            {/* Icon */}
            {icon && (
                <div className="flex justify-center mb-3 sm:mb-4">
                    <div className={cn(
                        "text-gray-800",
                        animation === 'bounce' && "animate-bounce",
                        animation === 'pulse' && "animate-pulse",
                        animation === 'spin' && "animate-spin",
                        iconClassName
                    )}
                        style={{ animationDelay }}
                    >
                        {icon}
                    </div>
                </div>
            )}

            {/* Value */}
            {value && (
                <div className={cn(
                    "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2",
                    animation === 'pulse' && "animate-pulse",
                    valueClassName
                )}>
                    {value}
                </div>
            )}

            {/* Label */}
            {label && (
                <div className={cn(
                    "text-sm sm:text-base text-gray-600 font-medium",
                    labelClassName
                )}>
                    {label}
                </div>
            )}

            {/* Description */}
            {description && (
                <div className={cn(
                    "text-xs sm:text-sm text-gray-500 mt-2",
                    descriptionClassName
                )}>
                    {description}
                </div>
            )}
        </div>
    );
}
