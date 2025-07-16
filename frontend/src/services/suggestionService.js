import axios from 'axios';
import courseData from '../data/CourseData';

export const fetchSuggestions = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const history = JSON.parse(localStorage.getItem('history')) || [];

        const interactedCourses = [...favorites, ...history];
        const interactedCategories = [...new Set(interactedCourses.map(c => c.category))];

        const interactedIds = new Set(interactedCourses.map(c => c.id));

        const relatedCourses = courseData.filter(course =>
          interactedCategories.includes(course.category) && !interactedIds.has(course.id)
        );

        const suggestions = relatedCourses.length > 0
          ? relatedCourses.slice(0, 10)
          : courseData.slice(0, 10);
        resolve({ data: suggestions });
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });
};
