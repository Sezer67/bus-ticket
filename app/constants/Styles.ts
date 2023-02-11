import { StyleSheet } from 'react-native';
import Layout from './Layout';
import COLORS from './Colors';

const GLOBAL_STYLES = StyleSheet.create({
  separator: {
    marginVertical: 10,
    height: 1,
    width: Layout.window.width / 2,
    backgroundColor: COLORS['danger-400'],
  },
});

export default GLOBAL_STYLES;
