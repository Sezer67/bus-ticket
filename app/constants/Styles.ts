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
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS['danger-400'],
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  focusInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS['danger-400'],
    borderRadius: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginBottom: 20,
    backgroundColor: COLORS['info-100'],
  },
});

export default GLOBAL_STYLES;
