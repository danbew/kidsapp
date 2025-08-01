import { useState, useEffect } from 'react';

export interface Course {
  name: string;
  id: string;
  image: string;
  bgColor: string;
  tags: string[];
}

export const useCourses = () => {
  const [data, setData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://logiclike.com/docs/courses.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};
