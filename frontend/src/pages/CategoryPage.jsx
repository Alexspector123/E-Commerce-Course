import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  const query = searchParams.get('q'); 
  const source = searchParams.get('src'); 
  const keyword = searchParams.get('kw');

  useEffect(() => {
    if (query) {
      const fakeCourses = [
        { id: 1, title: 'Full Stack Web Development Bootcamp' },
        { id: 2, title: 'Frontend with React' },
        { id: 3, title: 'Backend Node.js Mastery' }
      ];

      const filtered = fakeCourses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kết quả tìm kiếm cho: "{query}"</h1>
      {results.map(course => (
        <div key={course.id} className="mb-3">
          <p className="text-lg font-medium">{course.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
