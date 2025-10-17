import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ActionButton({
    children,
    icon,
    variant = 'default',
    size = 'default',
    className = '',
    iconPosition = 'left',
    loading = false,
    disabled = false,
    onClick,
    type = 'button',
    ...props
}) {
    const getVariantClasses = () => {
        const variants = {
            primary: 'bg-orange-800 hover:bg-orange-700 text-white',
            secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
            success: 'bg-green-600 hover:bg-green-700 text-white',
            danger: 'bg-red-600 hover:bg-red-700 text-white',
            warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
            info: 'bg-blue-600 hover:bg-blue-700 text-white',
            outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
            ghost: 'text-gray-700 hover:bg-gray-100',
            link: 'text-blue-600 hover:text-blue-800 underline'
        };
        return variants[variant] || variants.primary;
    };

    const getSizeClasses = () => {
        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            default: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
            xl: 'px-8 py-4 text-xl'
        };
        return sizes[size] || sizes.default;
    };

    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={cn(
                'transition-all duration-200',
                getVariantClasses(),
                getSizeClasses(),
                className
            )}
            {...props}
        >
            {loading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Loading...
                </div>
            ) : (
                <div className="flex items-center">
                    {icon && iconPosition === 'left' && (
                        <span className="mr-2">{icon}</span>
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <span className="ml-2">{icon}</span>
                    )}
                </div>
            )}
        </Button>
    );
}
