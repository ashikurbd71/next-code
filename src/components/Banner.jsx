import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Users, Trophy, Lightbulb } from 'lucide-react';

export default function Banner() {
    return (
        <section className="relative bg-white text-gray-900 overflow-hidden min-h-screen">
            {/* Animated Dotted Background Pattern */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute inset-0 animate-pulse" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.8'%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                    animation: 'float 15s ease-in-out infinite'
                }}></div>
            </div>

            {/* Secondary Dotted Pattern for Depth */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d1d5db' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    animation: 'float 25s ease-in-out infinite reverse'
                }}></div>
            </div>

            {/* Animated Abstract Background Shapes */}
            <div className="absolute top-10 sm:top-20 right-4 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute top-20 sm:top-40 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-20 sm:bottom-40 right-4 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>

            {/* Floating Code Elements */}
            <div className="absolute top-16 sm:top-32 left-1/4 text-gray-300 text-3xl sm:text-4xl lg:text-6xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}>&lt;/&gt;</div>
            <div className="absolute top-32 sm:top-60 right-1/4 text-gray-300 text-2xl sm:text-3xl lg:text-4xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}>&lt;/&gt;</div>
            <div className="absolute bottom-32 sm:bottom-60 left-1/3 text-gray-300 text-2xl sm:text-3xl lg:text-5xl opacity-20 animate-pulse" style={{ animationDelay: '2.5s' }}>&lt;/&gt;</div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
                <div className="text-center">
                    {/* Main Heading */}
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-4xl lg:text-6xl  font-bold mb-4 sm:mb-6 leading-tight animate-fade-in-up px-2">
                        Welcome to{' '}
                        <span className="text-orange-800 animate-pulse">
                            NextCode
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-700 mb-3 sm:mb-4 font-medium animate-fade-in-up px-4" style={{ animationDelay: '0.3s' }}>
                        Where Programming Meets Innovation
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-md text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.6s' }}>
                        Join <span className='font-bold text-orange-800'>Rangpur Ideal Institute and technology</span> programming club. Learn{' '}
                        <span className="text-orange-800 font-semibold animate-pulse" style={{ animationDelay: '1s' }}>Python</span>,{' '}
                        <span className="text-orange-800 font-semibold animate-pulse" style={{ animationDelay: '1.2s' }}>JavaScript</span>,{' '}
                        <span className="text-orange-800 font-semibold animate-pulse" style={{ animationDelay: '1.4s' }}>AI</span> and more from passionate students and mentors.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20 animate-fade-in-up px-4" style={{ animationDelay: '0.9s' }}>
                        <Button asChild size="lg" className="bg-orange-800 text-white hover:bg-orange-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                            <Link href="/join" className="flex items-center justify-center space-x-2">
                                <Code className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" style={{ animationDuration: '3s' }} />
                                <span>Join Club</span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                            <Link href="/events" className="flex items-center justify-center space-x-2">
                                <span>Upcoming Events</span>
                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce" />
                            </Link>
                        </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-4">
                        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                            <div className="flex justify-center mb-3 sm:mb-4">
                                <Users className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-800 animate-bounce" style={{ animationDelay: '2s' }} />
                            </div>
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 animate-pulse">500+</div>
                            <div className="text-sm sm:text-base text-gray-600 font-medium">Active Members</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
                            <div className="flex justify-center mb-3 sm:mb-4">
                                <Trophy className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-800 animate-bounce" style={{ animationDelay: '2.2s' }} />
                            </div>
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 animate-pulse">50+</div>
                            <div className="text-sm sm:text-base text-gray-600 font-medium">Workshops</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up sm:col-span-2 lg:col-span-1" style={{ animationDelay: '1.8s' }}>
                            <div className="flex justify-center mb-3 sm:mb-4">
                                <Code className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-800 animate-bounce" style={{ animationDelay: '2.4s' }} />
                            </div>
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 animate-pulse">24/7</div>
                            <div className="text-sm sm:text-base text-gray-600 font-medium">Code Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
