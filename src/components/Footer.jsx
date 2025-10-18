import Link from 'next/link';
import { Code2, Mail, MapPin, Phone, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#fbfcfc] text-gray-900">
            <div className="w-full mx-auto px-6 sm:px-14 lg:px-22 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-3 sm:mb-4">
                            <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                            <span className="text-xl sm:text-2xl font-bold text-black">Next<span className='text-orange-800'>Code</span></span>
                        </Link>
                        <p className="text-gray-900 mb-4 sm:mb-6 max-w-md text-sm sm:text-base leading-relaxed">
                            Empowering the next generation of coders through workshops, hackathons,
                            competitions, and collaborative projects. Join our community of passionate developers.
                        </p>
                        <div className="flex space-x-3 sm:space-x-4">
                            <a href="#" className="text-gray-900 hover:text-orange-800 transition-colors">
                                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                            </a>
                            <a href="#" className="text-gray-900 hover:text-orange-800 transition-colors">
                                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
                            </a>
                            <a href="#" className="text-gray-900 hover:text-orange-800 transition-colors">
                                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                            </a>
                            <a href="#" className="text-gray-900 hover:text-orange-800 transition-colors">
                                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-900 hover:text-orange-800 transition-colors text-sm sm:text-base">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="text-gray-900 hover:text-orange-800 transition-colors text-sm sm:text-base">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/talent" className="text-gray-900 hover:text-orange-800 transition-colors text-sm sm:text-base">
                                    Our Talent
                                </Link>
                            </li>
                            <li>
                                <Link href="/join" className="text-gray-900 hover:text-orange-800 transition-colors text-sm sm:text-base">
                                    Join Now
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h3>
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0" />
                                <span className="text-gray-900 text-xs sm:text-sm">contact@nextcode.com</span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0" />
                                <span className="text-gray-900 text-xs sm:text-sm">01581782193</span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                                <span className="text-gray-900 text-xs sm:text-sm">Rangpur Ideal Institute and Technology, Rangpur</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-orange-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                        <p className="text-gray-900 text-xs sm:text-sm">
                            © {currentYear} Next<span className='text-orange-800'>Code</span>. All rights reserved.
                        </p>
                        <div className="flex space-x-4 sm:space-x-6">
                            <Link href="/privacy" className="text-gray-900 hover:text-orange-800 text-xs sm:text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-900 hover:text-orange-800 text-xs sm:text-sm transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
