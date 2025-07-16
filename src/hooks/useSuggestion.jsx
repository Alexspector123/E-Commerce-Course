import { useState, useCallback } from 'react'
import { fetchSuggestions } from '../services/suggestionService'

export const useSuggestion = (userId) => {
    const [suggestion, setSuggestion] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadSuggestion = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetchSuggestions(userId);
            setSuggestion(response.data);
        } catch (error) {
            console.error(error);
            setError('Cannot get the suggestion');
        } finally {
            setLoading(false);
        }

    }, [userId]);

    return { suggestion, loading, error, loadSuggestion };
}