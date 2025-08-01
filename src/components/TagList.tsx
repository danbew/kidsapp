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
  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    const isSelected = (!selectedTag && index === 0) || selectedTag === item;
    return (
      <Pressable
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => {
          if (index === 0) {
            navigation.navigate('Home', {});
          } else {
            navigation.navigate('Home', { selectedTag: item });
          }
        }}
      >
        <Text style={[styles.itemText, isSelected && styles.selectedText]}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        data={allTags}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <Text style={styles.listHeaderText}>{'Выбор темы'}</Text>
        }
      />
      <Pressable
        hitSlop={10}
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
      marginTop: 12,
      paddingBottom: paddings.bottom + 60,
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
      fontFamily: 'Nunito-ExtraBold',
    },
    listHeaderText: {
      marginBottom: 12,
      fontSize: 18,
      fontFamily: 'Nunito-ExtraBold',
    },
    selectedItem: {
      backgroundColor: '#5CBB73',
      borderColor: '#5CBB73',
    },
    icon: {
      width: 14,
      height: 14,
    },
    iconContainer: {
      position: 'absolute',
      top: paddings.top + 32,
      right: paddings.right + 24,
    },
    firstItem: {
      borderWidth: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedText: {
      color: '#fff',
    },
  });

export { TagList };
