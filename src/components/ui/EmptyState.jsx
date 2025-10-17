import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function EmptyState({
    icon,
    title = 'No data available',
    description = 'There are no items to display at the moment.',
    action,
    className = '',
    iconClassName = '',
    titleClassName = '',
    descriptionClassName = '',
    actionClassName = ''
}) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center py-12 px-4 text-center",
            className
        )}>
            {/* Icon */}
            {icon && (
                <div className={cn(
                    "mb-4 text-gray-400",
                    iconClassName
                )}>
                    {icon}
                </div>
            )}

            {/* Title */}
            <h3 className={cn(
                "text-lg font-semibold text-gray-900 mb-2",
                titleClassName
            )}>
                {title}
            </h3>

            {/* Description */}
            <p className={cn(
                "text-gray-600 mb-6 max-w-md",
                descriptionClassName
            )}>
                {description}
            </p>

            {/* Action Button */}
            {action && (
                <div className={actionClassName}>
                    {action}
                </div>
            )}
        </div>
    );
}
