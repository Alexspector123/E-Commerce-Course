import React, { useState } from 'react'

export const useViewHistory = () => {
    const [history, setHistory] = useState(() => {
        const stored = localStorage.getItem("history");
        return stored ? JSON.parse(stored) : [];
    });

    const addToHistory = (courseId) => {
        setHistory(prev => {
            const newHistory = [courseId, ...prev.filter(id => id !== courseId)];
            const trimmed = newHistory.slice(0, 10);
            localStorage.setItem("history", JSON.stringify(trimmed));
            return trimmed;
        })
    }
  return { history, addToHistory };
};