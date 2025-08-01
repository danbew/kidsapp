import React, { useMemo, useEffect, useRef } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  Image,
  Animated,
} from 'react-native';
import { useCourses, Course } from '../hooks/api/useCourses';
import { usePaddings } from '../hooks/usePaddings';
import { EdgeInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ScreensParamList } from '../navigation/MainNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SelectButton from './SelectButton';

const AnimatedItem = ({
  item,
  index,
  styles,
}: {
  item: Course;
  index: number;
  styles: any;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY, index]);

  return (
    <Animated.View
      style={[
        styles.item,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={[styles.imageContainer, { backgroundColor: item.bgColor }]}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>
      <Text style={styles.text}>{item.name}</Text>
    </Animated.View>
  );
};

const CategoriesSection = ({ selectedTag }: { selectedTag?: string }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ScreensParamList>>();
  const { data, isLoading, error } = useCourses();
  const selectedCategories = useMemo(() => {
    if (!selectedTag) {
      return data;
    }
    return data.filter(course => course.tags.includes(selectedTag));
  }, [data, selectedTag]);

  const paddings = usePaddings();
  const styles = gesStyles(paddings);

  const renderItem: ListRenderItem<Course> = ({ item, index }) => (
    <AnimatedItem item={item} index={index!} styles={styles} />
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SelectButton
        title={selectedTag}
        onPress={() =>
          navigation.navigate('Details', {
            courses: data,
            selectedTag,
          })
        }
      />
      <FlatList
        data={selectedCategories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={5}
        getItemLayout={(_, index) => ({
          length: 210,
          height: 198,
          offset: (210 + 18) * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const gesStyles = (paddings: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#7446EE',
      paddingTop: paddings.top + 12,
      alignItems: 'center',
    },
    listContainer: {
      alignItems: 'center',
      borderRadius: 24,
      paddingLeft: paddings.left + 12,
      paddingRight: paddings.right + 12,
      paddingVertical: 20,
      gap: 18,
    },
    item: {
      width: 210,
      height: 198,
      borderRadius: 24,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      gap: 12,
      shadowColor: '#E5E8FE',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 15,
    },

    itemImage: {
      width: 144,
      height: 144,
    },
    imageContainer: {
      width: '100%',
      height: 162,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    text: {
      fontWeight: '800',
      fontFamily: 'Nunito-ExtraBold',
      fontSize: 14,
      textAlign: 'center',
      paddingHorizontal: 8,
      paddingBottom: 8,
    },
  });

export { CategoriesSection };
