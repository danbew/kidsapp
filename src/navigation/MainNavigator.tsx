import {
  createStaticNavigation,
  ParamListBase,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './HomeScreen';
import { DetailsScreen } from './DetailsScreen';
import { Course } from '../hooks/api/useCourses';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
});

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreensParamList {}
  }
}
export interface ScreensParamList extends ParamListBase {
  Home: {
    selectedTag?: string;
  };
  Details: {
    courses: Course[];
    selectedTag?: string;
  };
}
const Navigation = createStaticNavigation(RootStack);

export { Navigation };
