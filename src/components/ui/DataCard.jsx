import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DataCard({
    title,
    subtitle,
    description,
    badges = [],
    actions = [],
    className = '',
    children,
    ...props
}) {
    return (
        <Card className={cn("hover:shadow-lg transition-shadow duration-300", className)} {...props}>
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        {/* Title and Badges */}
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                            {badges.map((badge, index) => (
                                <Badge
                                    key={index}
                                    variant={badge.variant || "default"}
                                    className={badge.className}
                                >
                                    {badge.text}
                                </Badge>
                            ))}
                        </div>

                        {/* Subtitle */}
                        {subtitle && (
                            <p className="text-gray-600 mb-2">{subtitle}</p>
                        )}

                        {/* Description */}
                        {description && (
                            <p className="text-sm text-gray-500 mb-2">{description}</p>
                        )}

                        {/* Custom Content */}
                        {children}

                        {/* Additional Info */}
                        {props.additionalInfo && (
                            <div className="mt-2 text-sm text-gray-600">
                                {props.additionalInfo}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    {actions.length > 0 && (
                        <div className="flex gap-2 ml-4">
                            {actions.map((action, index) => (
                                <Button
                                    key={index}
                                    size="sm"
                                    variant={action.variant || "outline"}
                                    onClick={action.onClick}
                                    className={action.className}
                                    disabled={action.disabled}
                                    title={action.title}
                                >
                                    {action.icon}
                                    {action.text && <span className="ml-1">{action.text}</span>}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
