import { cn } from '@/lib/utils';

export default function SectionHeader({
    title,
    subtitle,
    description,
    centered = true,
    className = '',
    titleClassName = '',
    subtitleClassName = '',
    descriptionClassName = '',
    children
}) {
    return (
        <div className={cn(
            "mb-8 sm:mb-12 lg:mb-16",
            centered ? "text-center" : "text-left",
            className
        )}>
            {title && (
                <h2 className={cn(
                    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4",
                    titleClassName
                )}>
                    {title}
                </h2>
            )}

            {subtitle && (
                <h3 className={cn(
                    "text-lg sm:text-xl md:text-2xl font-semibold text-orange-800 mb-2 sm:mb-3 px-4",
                    subtitleClassName
                )}>
                    {subtitle}
                </h3>
            )}

            {description && (
                <p className={cn(
                    "text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed",
                    !centered && "mx-0",
                    descriptionClassName
                )}>
                    {description}
                </p>
            )}

            {children}
        </div>
    );
}
