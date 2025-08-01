import { useRoute, RouteProp } from '@react-navigation/native';
import { ScreensParamList } from './MainNavigator';
import { useMemo } from 'react';
import { TagList } from '../components/TagList';

type DetailsScreenRouteProp = RouteProp<ScreensParamList, 'Details'>;

function DetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const { courses, selectedTag } = route.params;
  const uniqueTags = useMemo(
    () => [...new Set(courses.flatMap(course => course.tags))],
    [courses],
  );
  return <TagList tags={uniqueTags} selectedTag={selectedTag} />;
}

export { DetailsScreen };
