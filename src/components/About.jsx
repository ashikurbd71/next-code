import { Target, Eye, Heart } from 'lucide-react';

export default function About() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 animate-fade-in-up">
                        About <span className='text-orange-800 animate-pulse'>NextCode</span>
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed animate-fade-in-up animation-delay-200">
                        We are a passionate community of developers, designers, and innovators
                        dedicated to fostering the next generation of tech talent.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    {/* Mission */}
                    <div className="text-center border p-4 sm:p-5 rounded-lg bg-white shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-300 group">
                        <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:rotate-12 transition-transform duration-300">
                            <Target className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">Our Mission</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            To create an inclusive environment where students can learn, collaborate,
                            and innovate. We believe in the power of community-driven learning and
                            hands-on experience to shape the future of technology.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="text-center border p-4 sm:p-5 rounded-lg bg-white shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-500 group">
                        <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:rotate-12 transition-transform duration-300">
                            <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-purple-600 transition-colors duration-300">Our Vision</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            To be the leading student coding community that bridges the gap between
                            academic learning and real-world application, producing industry-ready
                            developers and tech leaders.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="text-center border p-4 sm:p-5 rounded-lg bg-white shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-700 md:col-span-2 lg:col-span-1 group">
                        <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:rotate-12 transition-transform duration-300">
                            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-green-600 transition-colors duration-300">Our Values</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            We value collaboration, innovation, and continuous learning. Our community
                            thrives on mutual support, knowledge sharing, and the belief that everyone
                            has the potential to create something amazing.
                        </p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 animate-fade-in-up animation-delay-900 hover:shadow-xl transition-shadow duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                        <div className="order-2 lg:order-1 animate-slide-in-left animation-delay-1000">
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 hover:text-blue-600 transition-colors duration-300">Our Story</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed animate-fade-in animation-delay-1200">
                                NextCode was founded in 2025 by a group of passionate computer science students
                                who recognized the need for a more practical, hands-on approach to learning
                                programming and software development.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed animate-fade-in animation-delay-1400">
                                What started as a small study group has grown into a thriving community of
                                over 500 active members, hosting workshops, hackathons, and collaborative
                                projects that have helped students land internships and full-time positions
                                at top tech companies.
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed animate-fade-in animation-delay-1600">
                                Today, we continue to evolve and adapt to the changing landscape of technology,
                                always staying true to our core mission of empowering the next generation of coders.
                            </p>
                        </div>
                        <div className="bg-orange-800 rounded-xl p-6 sm:p-8 text-white order-1 lg:order-2 animate-slide-in-right animation-delay-1000 hover:scale-105 transition-transform duration-500">
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold mb-2 animate-bounce animation-delay-1800">500+</div>
                                <div className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base animate-fade-in animation-delay-2000">Active Members</div>
                                <div className="text-3xl sm:text-4xl font-bold mb-2 animate-bounce animation-delay-2200">50+</div>
                                <div className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base animate-fade-in animation-delay-2400">Events Hosted</div>
                                <div className="text-3xl sm:text-4xl font-bold mb-2 animate-bounce animation-delay-2600">100+</div>
                                <div className="text-blue-100 text-sm sm:text-base animate-fade-in animation-delay-2800">Projects Completed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
