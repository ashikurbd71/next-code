import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Carousel({
    items = [],
    itemsPerSlide = 1,
    autoSlide = false,
    autoSlideInterval = 4000,
    showDots = true,
    showArrows = true,
    className = '',
    onSlideChange,
    pauseOnHover = true
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(autoSlide);

    const totalSlides = Math.ceil(items.length / itemsPerSlide);

    // Auto-slide effect
    useEffect(() => {
        if (!isAutoSliding || items.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const nextSlide = prev < totalSlides - 1 ? prev + 1 : 0;
                onSlideChange?.(nextSlide);
                return nextSlide;
            });
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [isAutoSliding, items.length, totalSlides, autoSlideInterval, onSlideChange]);

    const nextSlide = () => {
        const nextSlideIndex = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        setCurrentSlide(nextSlideIndex);
        setIsAutoSliding(false);
        onSlideChange?.(nextSlideIndex);
    };

    const prevSlide = () => {
        const prevSlideIndex = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        setCurrentSlide(prevSlideIndex);
        setIsAutoSliding(false);
        onSlideChange?.(prevSlideIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
        setIsAutoSliding(false);
        onSlideChange?.(slideIndex);
    };

    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsAutoSliding(false);
        }
    };

    const handleMouseLeave = () => {
        if (pauseOnHover && autoSlide) {
            setIsAutoSliding(true);
        }
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <div
            className={cn("relative", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Navigation Arrows */}
            {showArrows && totalSlides > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-600" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-600" />
                    </button>
                </>
            )}

            {/* Carousel Content */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                            <div className="grid gap-4 sm:gap-6 lg:gap-8"
                                style={{
                                    gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)`
                                }}
                            >
                                {items
                                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                    .map((item, index) => (
                                        <div key={index}>
                                            {item}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot Indicators */}
            {showDots && totalSlides > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-all duration-300",
                                index === currentSlide
                                    ? "bg-orange-800 scale-125"
                                    : "bg-gray-300 hover:bg-gray-400"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
