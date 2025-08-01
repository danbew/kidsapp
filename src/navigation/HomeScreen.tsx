import { StyleSheet, View } from 'react-native';
import { CategoriesSection } from '../components/CategoriesSection';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScreensParamList } from './MainNavigator';

function HomeScreen() {
  type HomeScreenRouteProp = RouteProp<ScreensParamList, 'Home'>;
  const route = useRoute<HomeScreenRouteProp>();
  const selectedTag = route.params?.selectedTag;
  return (
    <View style={styles.container}>
      <CategoriesSection selectedTag={selectedTag} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { HomeScreen };
