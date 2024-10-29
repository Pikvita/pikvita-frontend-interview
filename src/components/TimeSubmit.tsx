import { FaClock } from 'react-icons/fa';
import React from 'react';

const TimeSubmit: React.FC = () => {
    return (
        <div className="container mx-auto p-4 max-w-screen-xl">
            <div className="flex items-center justify-between p-4 border w-full bg-white">
                <div className="flex items-center space-x-2">
                    <FaClock className="text-gray-600 h-6 w-6" />
                    <div className="flex flex-col">
                        <span className="text-gray-600 text-sm">Time remaining</span>
                        <span className="font-semibold text-lg text-gray-900">14 : 44 : 00</span>
                    </div>
                </div>
                <button className="bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default TimeSubmit;
