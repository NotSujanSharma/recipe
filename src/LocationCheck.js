import React, { useState, useEffect } from 'react';

const LocationCheck = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkLocation = async () => {
            try {
                // Request location permission
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                // Send location to backend
                const response = await fetch('https://api.bigcityops.ca/location/verify_location/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Location not allowed');
                }

                const data = await response.json();
                setIsAllowed(data.allowed);
            } catch (err) {
                setError(err.message);
                setIsAllowed(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkLocation();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Checking Location...</h2>
                    <p className="text-gray-600">Please allow location access when prompted</p>
                </div>
            </div>
        );
    }

    if (error || !isAllowed) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">Access Denied</h2>
                    <p className="text-gray-600">This content is not available in your region</p>
                </div>
            </div>
        );
    }

    return children;
};
export default LocationCheck;
