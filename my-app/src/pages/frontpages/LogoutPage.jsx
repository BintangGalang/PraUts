import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext'; 

export default function LogoutPage() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
            // In case of error, at least re-enable the button
            setIsLoggingOut(false);
        }
    };

    const handleCancel = () => {
        // This is a great UX feature. It sends the user
        // back to the page they were on before.
        navigate(-1); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                    Sign Out
                </h2>
                
                <p className="text-center text-gray-600 dark:text-gray-400">
                    Are you sure you want to sign out of your account?
                </p>

                {/* Button Container */}
                <div className="space-y-4 pt-4">
                    {/* Confirm Logout Button (Destructive Action) */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition duration-200 ease-in-out"
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                    </button>

                    {/* Cancel Button (Secondary Action) */}
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={isLoggingOut}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}