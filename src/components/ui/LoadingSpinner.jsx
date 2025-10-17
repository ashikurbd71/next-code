import { cn } from '@/lib/utils';

export default function LoadingSpinner({
    size = 'md',
    className = '',
    text = 'Loading...',
    showText = true
}) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    return (
        <div className={cn("flex flex-col items-center justify-center", className)}>
            <div
                className={cn(
                    "animate-spin rounded-full border-b-2 border-blue-600",
                    sizeClasses[size]
                )}
            />
            {showText && (
                <p className={cn("text-gray-600 mt-2", textSizeClasses[size])}>
                    {text}
                </p>
            )}
        </div>
    );
}
