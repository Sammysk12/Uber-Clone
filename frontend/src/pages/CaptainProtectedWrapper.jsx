import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'; // Ensure useState is imported

import { useNavigate } from 'react-router-dom';
import { CaptainsDataContext } from '../context/CaptainsContext';

const CaptainProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainsDataContext);
    const [isLoading, setIsLoading] = useState(true);
    // You might want a separate state to indicate authentication status if 'captain' can be null briefly
    // while authenticated. For now, we'll rely on !captain for render control.

    // This useEffect is for token verification and fetching captain profile
    useEffect(() => {
        const token = localStorage.getItem("token"); // Get token inside the effect

        const verifyCaptain = async () => {
            setIsLoading(true); // Indicate loading when starting the verification process

            if (!token) {
                // No token found, redirect immediately
                setIsLoading(false);
                navigate("/captain-login");
                return; // Exit the function
            }

            // Token exists, proceed to verify with backend
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200 && response.data.captain) {
                    setCaptain(response.data.captain);
                } else {
                    // API returned 200 but data is not what's expected, or internal server error
                    console.error("Captain profile fetch successful but unexpected data:", response.data);
                    localStorage.removeItem("token");
                    setCaptain(null);
                    navigate("/captain-login");
                }
            } catch (error) {
                console.error("Error fetching captain profile:", error);
                if (error.response && error.response.status === 401) {
                    // Token invalid/expired
                    localStorage.removeItem("token");
                    setCaptain(null);
                    navigate("/captain-login");
                } else {
                    // Other errors (e.g., network down, server error)
                    localStorage.removeItem("token"); // Clear token for safety
                    setCaptain(null);
                    navigate("/captain-login");
                }
            } finally {
                setIsLoading(false); // Always stop loading after the check
            }
        };

        verifyCaptain(); // Call the async function
    }, [navigate, setCaptain]); // Dependencies:
                               // - navigate: Stable function from hook
                               // - setCaptain: Stable function from hook

    // Render loading state while authentication is being checked
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If not loading and no captain data, it means authentication failed or user was redirected
    if (!captain) {
        return null; // Or a message like "Access Denied" if you want to show something before redirect
    }

    // If authenticated (captain data exists), render children
    return (
        <>
            {children}
        </>
    );
};

export default CaptainProtectedWrapper; 