import { View } from 'react-native';
import { CategoriesSection } from '../components/CategoriesSection';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CategoriesSection />
    </View>
  );
}
export { HomeScreen };
