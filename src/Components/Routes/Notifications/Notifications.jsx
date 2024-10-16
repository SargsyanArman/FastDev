import React from 'react';

const NotificationsPage = () => {
    return (
        <div className="flex items-center justify-center h-full bg-gray-100 w-[953px]">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Notifications</h1>
                <p className="text-lg text-gray-600 mb-6">You have no notifications yet</p>
                <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <svg
                        className="w-24 h-24 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v8l3 3"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
