"use client";
import React, { createContext, useState, useEffect } from "react";

// 1. Create the context
export const RestaurantContext = createContext();

// 2. Create a provider component
export const RestaurantProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Fetch restaurant data
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("/api/restaurants"); // Replace with your API endpoint
                if (!response.ok) throw new Error("Failed to fetch restaurants");

                const data = await response.json();
                setRestaurants(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <RestaurantContext.Provider value={{ restaurants, loading, error }}>
            {children}
        </RestaurantContext.Provider>
    );
};
