import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  ListRenderItem,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreensParamList } from '../navigation/MainNavigator';
import { usePaddings } from '../hooks/usePaddings';
import { EdgeInsets } from 'react-native-safe-area-context';

interface TagListProps {
  tags: string[];
  selectedTag?: string;
}

const TagList = ({ tags, selectedTag }: TagListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ScreensParamList>>();
  const allTags = ['Все темы', ...tags];
  const paddings = usePaddings();
  const styles = getStyles(paddings);
  const renderItem: ListRenderItem<string> = ({ item, index }) => (
    <Pressable
      style={[styles.item, selectedTag === item && styles.selectedItem]}
      onPress={() => {
        if (index === 0) {
          navigation.navigate('Home', {});
        } else {
          navigation.navigate('Home', { selectedTag: item });
        }
      }}
    >
      <Text style={styles.itemText}>{item}</Text>
    </Pressable>
  );

  return (
    <>
      <FlatList
        data={allTags}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.iconContainer}
      >
        <Image
          source={require('../../assets/icons/cross.png')}
          style={styles.icon}
        />
      </Pressable>
    </>
  );
};

const getStyles = (paddings: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: paddings.left,
      paddingTop: paddings.top + 24,
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
    },
    item: {
      paddingVertical: 9,
      paddingHorizontal: 20,
      borderWidth: 2,
      borderRadius: 12,
      borderColor: '#C5D0E6',
      width: 336,
    },
    itemText: {
      fontSize: 18,
      fontWeight: '800',
      fontFamily: 'Nunito',
    },
    selectedItem: {
      backgroundColor: '#5CBB73',
      borderColor: '#5CBB73',
    },
    icon: {
      width: 22,
      height: 22,
    },
    iconContainer: {
      position: 'absolute',
      top: paddings.top + 24,
      right: paddings.right + 12,
    },
  });

export { TagList };
