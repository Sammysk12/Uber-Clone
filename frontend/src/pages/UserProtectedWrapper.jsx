import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersDataContext } from '../context/UsersContext';

const UserProtectedWrapper = ({ children }) => {
    // DO NOT get token here. Get it inside useEffect.
    // const token = localStorage.getItem("token"); // <-- REMOVE THIS LINE

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useContext(UsersDataContext);

    useEffect(() => {
        // Get token INSIDE the useEffect. This ensures it's read only when the effect runs.
        const token = localStorage.getItem("token"); // <-- MOVE IT HERE

        const verifyUser = async () => {
            setIsLoading(true); // Always set loading to true when starting verification

            if (!token) {
                // No token found, redirect to login immediately
                setIsLoading(false);
                navigate("/login");
                return; // Stop execution here
            }

            // If token exists, proceed to verify it with the backend
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200 && response.data.user) {
                    const data = response.data;
                    setUser(data.user);
                } else {
                    console.error("Profile fetch successful but unexpected data:", response.data);
                    localStorage.removeItem("token");
                    setUser(null);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    setUser(null);
                    navigate("/login");
                } else {
                    console.error("Other error during profile fetch, redirecting to login.");
                    localStorage.removeItem("token"); // Clear token on any error for safety
                    setUser(null);
                    navigate("/login");
                }
            } finally {
                setIsLoading(false); // Always set loading to false after attempt
            }
        };

        verifyUser(); // Call the async function inside useEffect
    }, [user]); // Dependencies:
                             // - navigate: stable function from hook
                             // - setUser: stable function from hook
                             // Removed 'token' because it's now read INSIDE the effect.
                             // The effect will run once on mount, and then when navigate/setUser (which are stable) don't change.
                             // If you want to react to a change in localStorage.token from *outside* the component,
                             // you'd need a more advanced solution like a custom hook for localStorage or a global event listener.
                             // But for typical auth flows, this is usually sufficient.


    // Render loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Render children only if a user is set
    if (!user) { // If user is null (e.g., after redirection to login, or initial state)
      return null; // Don't render children if user isn't authenticated
    }

    return (
        <>
            {children}
        </>
    );
};

export default UserProtectedWrapper;