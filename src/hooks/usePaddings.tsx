import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

export const usePaddings = (): EdgeInsets => {
  const insets = useSafeAreaInsets();

  return {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
  };
};
