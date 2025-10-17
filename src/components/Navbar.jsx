'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2 } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Leaderboard', href: '/leaderboard' },
        { name: 'Events', href: '/events' },
        { name: 'Our Talent', href: '/talent' },
    ];

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-22">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 mobile-tap-highlight">
                        <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-black">Next<span className='text-orange-800'>Code</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm lg:text-base font-medium transition-colors mobile-tap-highlight"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button asChild className="bg-orange-800 hover:bg-orange-700 mobile-button">
                            <Link href="/join">Join Now</Link>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 mobile-touch-target mobile-tap-highlight"
                        >
                            {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t transform transition-transform duration-300 ease-in-out">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-gray-700 hover:text-blue-600 block px-3 py-3 text-base font-medium transition-all duration-200 hover:bg-gray-50 rounded-md mobile-touch-target mobile-tap-highlight ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                    }`}
                                style={{
                                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className={`px-3 py-2 transition-all duration-200 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                            }`} style={{ transitionDelay: isOpen ? `${navItems.length * 50}ms` : '0ms' }}>
                            <Button asChild className="w-full bg-orange-800 hover:bg-orange-700 transition-all duration-200 hover:scale-105 mobile-button">
                                <Link href="/join" onClick={() => setIsOpen(false)}>
                                    Join Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
