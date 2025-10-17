import { Code, Users, Trophy, Lightbulb, Calendar, BookOpen } from 'lucide-react';

export default function WhatWeDo() {
    const activities = [
        {
            icon: <Code className="h-8 w-8" />,
            title: "Workshops",
            description: "Hands-on coding workshops covering the latest technologies, frameworks, and best practices in software development.",
            color: "bg-blue-500",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            icon: <Trophy className="h-8 w-8" />,
            title: "Hackathons",
            description: "Intensive coding competitions where teams collaborate to build innovative solutions to real-world problems.",
            color: "bg-purple-500",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600"
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Competitions",
            description: "Regular coding contests and algorithm challenges to sharpen problem-solving skills and competitive programming.",
            color: "bg-green-500",
            iconBg: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            icon: <Lightbulb className="h-8 w-8" />,
            title: "Projects",
            description: "Collaborative projects that allow members to work on real-world applications and build their portfolios.",
            color: "bg-orange-500",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600"
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: "Events",
            description: "Tech talks, networking events, and industry meetups to connect with professionals and stay updated.",
            color: "bg-pink-500",
            iconBg: "bg-pink-100",
            iconColor: "text-pink-600"
        },
        {
            icon: <BookOpen className="h-8 w-8" />,
            title: "Learning",
            description: "Study groups, peer learning sessions, and mentorship programs to support continuous growth.",
            color: "bg-indigo-500",
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600"
        }
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">What  <span className='text-orange-800 animate-pulse'>We Do</span> </h2>
                    <p className="text-base sm:text-lg md:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                        We provide a comprehensive platform for students to develop their technical skills,
                        build meaningful connections, and prepare for successful careers in technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-gray-100 hover:border-gray-200"
                        >
                            {/* Icon */}
                            <div className={`${activity.iconBg} w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <div className={`${activity.iconColor} h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8`}>
                                    {activity.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">
                                {activity.title}
                            </h3>
                            <p className="text-sm  lg:text-md text-gray-600 leading-relaxed">
                                {activity.description}
                            </p>

                            {/* Hover Effect */}
                            <div className={`absolute inset-0 ${activity.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12 sm:mt-16">
                    <div className="bg-orange-800 rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
                        <h3 className="text-2xl sm:text-3xl lg:text-2xl font-bold mb-3 sm:mb-4 px-4">Ready to Get Started?</h3>
                        <p className="text-base sm:text-lg lg:text-lg text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
                            Join our community today and start your journey towards becoming a skilled developer.
                            Whether you're a beginner or an experienced coder, there's a place for you here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                            <a
                                href="/join"
                                className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center text-sm sm:text-base"
                            >
                                Join NextCode
                            </a>
                            <a
                                href="/events"
                                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center text-sm sm:text-base"
                            >
                                View Upcoming Events
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
