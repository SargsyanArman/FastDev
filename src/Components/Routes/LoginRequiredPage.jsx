import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRequiredPage = () => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-screen w-[953px] bg-gray-100">
            <div className="text-center w-[300px] p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
                <p className="text-lg text-gray-600 mb-6">
                    You must log in to access this page. Please log in to continue.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200" onClick={() => navigate('/signin')}>
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default LoginRequiredPage;
