import {
  createStaticNavigation,
  ParamListBase,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './HomeScreen';
import { DetailsScreen } from './DetailsScreen';

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
    categoryId: number;
  };
  Details: {
    categories: {
      title: string;
      id: number;
    }[];
  };
}
const Navigation = createStaticNavigation(RootStack);

export { Navigation };
