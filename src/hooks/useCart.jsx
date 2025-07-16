import React, { useState } from 'react'

export const useViewHistory = () => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    const addToCart = (courseId) => {
        setCart(prev => {
            const newCart = [courseId, ...prev.filter(id => id !== courseId)];
            const trimmed = newCart.slice(0, 10);
            localStorage.setItem("cart", JSON.stringify(trimmed));
            return trimmed;
        })
    }
  return { cart, addToCart };
};