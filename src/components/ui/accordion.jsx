'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Accordion = ({ items, className = '' }) => {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (index) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {items.map((item, index) => {
                const isOpen = openItems.has(index);

                return (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            className="accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                {item.title}
                            </h3>
                            <div className="flex-shrink-0">
                                <ChevronDown
                                    className={`accordion-icon h-5 w-5 text-gray-500 ${isOpen ? 'rotated' : ''}`}
                                />
                            </div>
                        </button>

                        <div
                            className={`accordion-content overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="px-6 pb-4">
                                <div className="text-gray-600 leading-relaxed">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
