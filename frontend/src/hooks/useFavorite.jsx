import React, { useState } from 'react'

export const useFavorite = () => {
    const [favorite, setFavorite] = useState(() => {
        const liked = localStorage.getItem("favorite");
        return liked ? JSON.parse(liked) : [];
    });

    const addFavorite = (courseId) => {
        setFavorite(prev => {
            let updated;
            if (prev.includes(courseId)){
                updated = prev.filter(id => id !== courseId);
            } else {
                updated = [...prev, courseId];
            }
            localStorage.setItem("favorite", JSON.stringify(updated));
            return updated;
        })
    }
  return { favorite, addFavorite };
};