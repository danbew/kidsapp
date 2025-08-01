import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
type Props = {
  title?: string;
  onPress: () => void;
};
const SelectButton = ({ title = 'Все темы', onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.button} hitSlop={10}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/icons/down-poiner.png')}
          style={styles.icon}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'row',
    borderRadius: 24,
    padding: 5,
    paddingLeft: 10,
    gap: 8,
  },
  text: {
    color: 'white',
    fontFamily: 'Nunito-ExtraBold',
    fontWeight: '800',
    fontSize: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 10,
    height: 6,
  },
});
export default SelectButton;
